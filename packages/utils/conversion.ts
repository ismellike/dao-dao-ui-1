import { fromBech32, toBech32, toHex } from '@cosmjs/encoding'
import { TFunction } from 'next-i18next'
import { Loadable } from 'recoil'

import {
  CachedLoadable,
  Duration,
  DurationUnits,
  DurationWithUnits,
  LoadingData,
  LoadingDataWithError,
} from '@dao-dao/types'
import { Expiration } from '@dao-dao/types/contracts/common'

import { getChainForChainId } from './chain'
import { IPFS_GATEWAY_TEMPLATE, SITE_URL } from './constants'

export function convertMicroDenomToDenomWithDecimals(
  amount: number | string,
  decimals: number
) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  amount = amount / Math.pow(10, decimals)
  return isNaN(amount) ? 0 : amount
}

export function convertDenomToMicroDenomWithDecimals(
  amount: number | string,
  decimals: number
) {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  // Need to round. Example: `8.029409 * Math.pow(10, 6)`.
  amount = Math.round(amount * Math.pow(10, decimals))
  return isNaN(amount) ? 0 : amount
}

// Using BigInt.toString() ensures the value is not abbreviated. The
// Number.toString() function abbreviates large numbers like 1e20.
export const convertDenomToMicroDenomStringWithDecimals = (
  ...params: Parameters<typeof convertDenomToMicroDenomWithDecimals>
) => BigInt(convertDenomToMicroDenomWithDecimals(...params)).toString()

export function convertFromMicroDenom(denom: string) {
  return denom?.substring(1).toUpperCase()
}

export function convertToFixedDecimals(amount: number | string): string {
  if (typeof amount === 'string') {
    amount = Number(amount)
  }
  if (amount > 0.01) {
    return amount.toFixed(2)
  } else return String(amount)
}

export const expirationAtTimeToSecondsFromNow = (exp: Expiration) => {
  if (!('at_time' in exp)) {
    return
  }

  const end = Number(exp['at_time'])
  const nowSeconds = new Date().getTime() / 1000
  const endSeconds = end / 1000000000

  return endSeconds - nowSeconds
}

export const zeroPad = (num: number, target: number) => {
  const s = num.toString()
  if (s.length >= target) {
    return s
  }
  return '0'.repeat(target - s.length) + s
}

export const spacePad = (number: string, target: number) =>
  number.length >= length ? number : ' '.repeat(target - number.length) + number

export const convertDurationWithUnitsToSeconds = ({
  units,
  value,
}: DurationWithUnits): number => {
  switch (units) {
    case DurationUnits.Seconds:
      return value
    case DurationUnits.Minutes:
      return value * 60
    case DurationUnits.Hours:
      return value * 60 * 60
    case DurationUnits.Days:
      return value * 60 * 60 * 24
    case DurationUnits.Weeks:
      return value * 60 * 60 * 24 * 7
    case DurationUnits.Months:
      return value * 60 * 60 * 24 * 30
    case DurationUnits.Years:
      return value * 60 * 60 * 24 * 365
    default:
      throw new Error(`Unsupported time duration unit: ${units}`)
  }
}

export const convertDurationWithUnitsToDuration = (
  durationWithUnits: DurationWithUnits
): Duration =>
  durationWithUnits.units === DurationUnits.Blocks
    ? {
        height: durationWithUnits.value,
      }
    : {
        time: convertDurationWithUnitsToSeconds(durationWithUnits),
      }

export const convertDurationToDurationWithUnits = (
  duration: Duration
): DurationWithUnits =>
  'height' in duration
    ? { units: DurationUnits.Blocks, value: duration.height }
    : convertSecondsToDurationWithUnits(duration.time)

// Use largest whole-number unit possible.
export const convertSecondsToDurationWithUnits = (
  seconds: number
): DurationWithUnits => {
  if (seconds % (60 * 60 * 24 * 365) === 0) {
    return {
      value: seconds / (60 * 60 * 24 * 365),
      units: DurationUnits.Years,
    }
  } else if (seconds % (60 * 60 * 24 * 30) === 0) {
    return {
      value: seconds / (60 * 60 * 24 * 30),
      units: DurationUnits.Months,
    }
  } else if (seconds % (60 * 60 * 24 * 7) === 0) {
    return {
      value: seconds / (60 * 60 * 24 * 7),
      units: DurationUnits.Weeks,
    }
  } else if (seconds % (60 * 60 * 24) === 0) {
    return {
      value: seconds / (60 * 60 * 24),
      units: DurationUnits.Days,
    }
  } else if (seconds % (60 * 60) === 0) {
    return {
      value: seconds / (60 * 60),
      units: DurationUnits.Hours,
    }
  } else if (seconds % 60 === 0) {
    return {
      value: seconds / 60,
      units: DurationUnits.Minutes,
    }
  } else {
    return {
      value: seconds,
      units: DurationUnits.Seconds,
    }
  }
}

export const convertDurationWithUnitsToHumanReadableString = (
  t: TFunction,
  { units, value }: DurationWithUnits
): string =>
  `${value} ${t(`unit.${units}`, {
    count: value,
  }).toLocaleLowerCase()}`

// Convert Recoil loadable into our generic data loader type with a default
// value on error. See the comment above the LoadingData type for more details.
export const loadableToLoadingData = <T>(
  loadable: CachedLoadable<T> | Loadable<T>,
  defaultValue: T,
  onError?: (error: any) => void
): LoadingData<T> => {
  if (loadable.state === 'hasError') {
    onError?.(loadable.contents)
  }

  return loadable.state === 'loading' ||
    // If on server, start by loading to prevent hyration error.
    typeof window === 'undefined'
    ? { loading: true }
    : loadable.state === 'hasValue'
    ? {
        loading: false,
        updating: 'updating' in loadable ? loadable.updating : undefined,
        data: loadable.contents,
      }
    : {
        loading: false,
        data: defaultValue,
      }
}

// Combine many data loaders into one.
export const combineLoadingDatas = <T>(
  ...loadables: LoadingData<T[]>[]
): LoadingData<T[]> =>
  loadables.some((l) => l.loading)
    ? {
        loading: true,
      }
    : {
        loading: false,
        data: loadables.flatMap((l) => (l.loading ? [] : l.data)),
      }

// Combine many data with error loaders into one.
export const combineLoadingDataWithErrors = <T>(
  ...loadables: LoadingDataWithError<T[]>[]
): LoadingDataWithError<T[]> =>
  loadables.some((l) => l.loading)
    ? {
        loading: true,
        errored: false,
      }
    : loadables.some((l) => l.errored)
    ? {
        loading: false,
        errored: true,
        // First error.
        error: loadables.flatMap((l) => (l.errored ? l.error : []))[0],
      }
    : {
        loading: false,
        errored: false,
        data: loadables.flatMap((l) => (l.loading || l.errored ? [] : l.data)),
      }

// Convert Recoil loadable into our generic data loader with error type. See the
// comment above the LoadingData type for more details.
export const loadableToLoadingDataWithError = <T>(
  loadable: CachedLoadable<T> | Loadable<T>
): LoadingDataWithError<T> => {
  return loadable.state === 'loading' ||
    // If on server, start by loading to prevent hyration error.
    typeof window === 'undefined'
    ? { loading: true, errored: false }
    : loadable.state === 'hasValue'
    ? {
        loading: false,
        errored: false,
        updating: 'updating' in loadable ? loadable.updating : undefined,
        data: loadable.contents,
      }
    : {
        loading: false,
        errored: true,
        error: !loadable.contents
          ? new Error('Unknown error')
          : loadable.contents instanceof Error
          ? loadable.contents
          : new Error(`${loadable.contents}`),
      }
}

export const convertExpirationToDate = (
  blocksPerYear: number,
  expiration: Expiration,
  // For converting height to rough date.
  currentBlockHeight: number
): Date | undefined =>
  'at_height' in expiration && currentBlockHeight > 0
    ? new Date(
        Date.now() +
          convertBlocksToSeconds(
            blocksPerYear,
            expiration.at_height - currentBlockHeight
          ) *
            1000
      )
    : 'at_time' in expiration
    ? // Timestamp is in nanoseconds, convert to microseconds.
      new Date(Number(expiration.at_time) / 1e6)
    : undefined

export const convertBlocksToSeconds = (blocksPerYear: number, blocks: number) =>
  Math.round((blocks / blocksPerYear) * 365 * 24 * 60 * 60)

export const convertSecondsToBlocks = (
  blocksPerYear: number,
  seconds: number
) => Math.round((seconds * blocksPerYear) / (365 * 24 * 60 * 60))

export const durationToSeconds = (blocksPerYear: number, duration: Duration) =>
  'height' in duration
    ? convertBlocksToSeconds(blocksPerYear, duration.height)
    : duration.time

// Convert IPFS protocol URL to HTTPS protocol URL using IPFS gateway.
export const transformIpfsUrlToHttpsIfNecessary = (ipfsUrl: string) =>
  ipfsUrl.startsWith('ipfs://')
    ? IPFS_GATEWAY_TEMPLATE.replace('PATH', ipfsUrl.replace('ipfs://', ''))
    : ipfsUrl

// Transform image URLs to ensure they can be accessed. They need to be using
// https protocol, not ipfs, and potentially from a whitelisted IPFS gateway.
// They only need to be from a whitelisted IPFS gateway if being used in a
// NextJS Image component (in which case proxy should also be set to true so
// that non-IPFS images are proxied through our whitelisted proxy domain).
export const toAccessibleImageUrl = (
  url: string,
  { proxy, replaceRelative }: { proxy?: boolean; replaceRelative?: boolean } = {
    proxy: false,
    replaceRelative: false,
  }
) => {
  // If hosted locally, passthrough (probably development/test env).
  if (url.startsWith('/')) {
    return replaceRelative ? SITE_URL + url : url
  }

  url = transformIpfsUrlToHttpsIfNecessary(url)

  // Convert `https://CID.ipfs.nftstorage.link` to
  // `https://nftstorage.link/ipfs/CID` because we have to explicitly whitelist
  // domains, and the CID is the part that changes.
  if (url.includes('.ipfs.nftstorage.link')) {
    const matches = url.match(/([a-zA-Z0-9]+)\.ipfs\.nftstorage\.link(.*)$/)
    if (matches?.length === 3) {
      url = `https://nftstorage.link/ipfs/${matches[1]}${matches[2]}`
      return url
    }
  }

  // Convert `https://CID.ipfs.cf-ipfs.com` to `https://cf-ipfs.com/ipfs/CID`
  // because we have to explicitly whitelist domains, and the CID is the part
  // that changes.
  if (url.includes('.ipfs.cf-ipfs.com')) {
    const matches = url.match(/([a-zA-Z0-9]+)\.ipfs\.cf-ipfs\.com(.*)$/)
    if (matches?.length === 3) {
      url = `https://cf-ipfs.com/ipfs/${matches[1]}${matches[2]}`
      return url
    }
  }

  // If this is not an IPFS image, we can't enforce that it is coming from one
  // of our NextJS allowed image sources. Thus proxy it through a whitelisted
  // domain. This only needs to be used for images that are displayed in the
  // NextJS Image component, which is why it is optional and off by default.
  if (proxy && !url.includes('ipfs')) {
    url = `https://img-proxy.ekez.workers.dev/${url}`
  }

  return url
}

// Converts an address to its corresponding validator address.
export const toValidatorAddress = (address: string, bech32Prefix: string) => {
  try {
    return toBech32(bech32Prefix + 'valoper', fromBech32(address).data)
  } catch (err) {
    return ''
  }
}

// Convert bech32 address to general hex bech32 hash.
export const toBech32Hash = (address: string) => {
  try {
    return toHex(fromBech32(address).data)
  } catch (err) {
    return ''
  }
}

export const concatAddressStartEnd = (
  address: string,
  takeStart: number,
  takeEnd: number
) => {
  const first = address.substring(0, takeStart)
  const last = address.substring(address.length - takeEnd, address.length)
  return [first, last].filter(Boolean).join('..')
}

export const concatAddressBoth = (address: string, takeN = 7): string =>
  address && concatAddressStartEnd(address, takeN, takeN)

export const transformBech32Address = (address: string, toChainId: string) =>
  toBech32(
    getChainForChainId(toChainId).bech32_prefix,
    fromBech32(address).data
  )
