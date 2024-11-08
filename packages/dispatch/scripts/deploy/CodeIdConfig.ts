import fs from 'fs'
import path from 'path'

import chalk from 'chalk'
import lockfile from 'proper-lockfile'
import semverCompare from 'semver/functions/compare'

/**
 * Path to all uploaded code IDs.
 */
const codeIdsPath = path.join(
  __dirname,
  '../../../utils/constants/codeIds.json'
)

type CodeIds = Record<string, Record<string, Record<string, number>>>

/**
 * A class that manages the code ID config.
 */
export class CodeIdConfig {
  private _codeIds: CodeIds = {}

  constructor() {
    if (!fs.existsSync(codeIdsPath)) {
      console.log(chalk.red(`Code IDs file not found at ${codeIdsPath}`))
      process.exit(1)
    }
  }

  get codeIds() {
    return this._codeIds
  }

  private load() {
    this._codeIds = JSON.parse(fs.readFileSync(codeIdsPath, 'utf8'))
  }

  private save() {
    fs.writeFileSync(codeIdsPath, JSON.stringify(this._codeIds, null, 2))
  }

  async setCodeId({
    chainId,
    version,
    name: _name,
    codeId,
  }: {
    /**
     * The chain ID.
     */
    chainId: string
    /**
     * The contract version being deployed.
     */
    version: string
    /**
     * The contract name being deployed.
     */
    name: string
    /**
     * The code ID being set.
     */
    codeId: number
  }) {
    // Establish lock.
    const releaseLock = await lockfile.lock(codeIdsPath, {
      retries: {
        forever: true,
        minTimeout: 100,
        factor: 1.1,
        randomize: true,
      },
    })

    try {
      const name = contractNameToCodeIdName(_name)

      this.load()

      if (!this._codeIds[chainId]) {
        this._codeIds[chainId] = {}
      }
      if (!this._codeIds[chainId][version]) {
        this._codeIds[chainId][version] = {}
      }

      this._codeIds[chainId][version][name] = codeId

      this.save()
    } finally {
      // Release lock.
      await releaseLock()
    }
  }

  /**
   * Get the most recent code ID and version for this chain, or null if code ID
   * has not been set for this chain.
   */
  async getLatestCodeId({
    chainId,
    name: _name,
  }: {
    /**
     * The chain ID.
     */
    chainId: string
    /**
     * The contract name.
     */
    name: string
  }): Promise<{
    /**
     * The latest version of the contract found.
     */
    version: string
    /**
     * The code ID.
     */
    codeId: number
  } | null> {
    // Establish lock.
    const releaseLock = await lockfile.lock(codeIdsPath, {
      retries: {
        forever: true,
        minTimeout: 100,
        factor: 1.1,
        randomize: true,
      },
    })

    try {
      const name = contractNameToCodeIdName(_name)

      this.load()

      const versionsDescending = Object.keys(this._codeIds[chainId])
        .sort(semverCompare)
        .reverse()

      for (const version of versionsDescending) {
        if (typeof this._codeIds[chainId]?.[version]?.[name] === 'number') {
          return {
            version,
            codeId: this._codeIds[chainId][version][name],
          }
        }
      }

      return null
    } finally {
      // Release lock.
      await releaseLock()
    }
  }

  /**
   * Return the code ID for this chain and version, or null if not set.
   */
  async getCodeId({
    chainId,
    name: _name,
    version,
  }: {
    /**
     * The chain ID.
     */
    chainId: string
    /**
     * The contract name.
     */
    name: string
    /**
     * The version of the contract.
     */
    version: string
  }): Promise<number | null> {
    // Establish lock.
    const releaseLock = await lockfile.lock(codeIdsPath, {
      retries: {
        forever: true,
        minTimeout: 100,
        factor: 1.1,
        randomize: true,
      },
    })

    try {
      const name = contractNameToCodeIdName(_name)

      this.load()

      if (typeof this._codeIds[chainId]?.[version]?.[name] === 'number') {
        return this._codeIds[chainId][version][name]
      }

      return null
    } finally {
      // Release lock.
      await releaseLock()
    }
  }
}

/**
 * Convert snake case contract name to title case code ID name.
 */
export const contractNameToCodeIdName = (name: string) =>
  name
    .split(/[_\-]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
