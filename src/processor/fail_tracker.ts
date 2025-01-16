type FailedAttemptsEntry = {
  count: number;
  err : Error | null;
  lastAttempt: Date | null;
};

export class FailedAttemptsTracker {
  private failedAttempts: Map<string, FailedAttemptsEntry> = new Map();

  private static readonly MAX_ATTEMPTS = 1;
  private static readonly RESET_TIME = 20 * 60 * 1000; // 20 minutes in milliseconds

  /**
   * Record the result of an attempt (success or failure) for a given URL.
   * @param url The URL for which the attempt was made.
   * @param success Whether the attempt was successful.
   */
  recordAttempt(url: string, success: boolean, err : Error | null): void {
    if (success) {
      // On success, reset the entry for this URL
      this.failedAttempts.delete(url);
    } else {
      // On failure, update the entry
      const entry = this.failedAttempts.get(url);
      if (entry) {
        if (entry.count < FailedAttemptsTracker.MAX_ATTEMPTS) {
          entry.count += 1;
        } else {
          entry.lastAttempt = new Date();
        }
      } else {
        this.failedAttempts.set(url, { count: 1, lastAttempt: null, err: err });
      }
    }
  }

  /**
   * Determine whether to proceed with checking a URL.
   * This function will reset the entry for the URL if enough time has passed.
   * @param url The URL to check.
   * @returns True if the URL can be checked, false if it should be skipped.
   */
  shouldSkip(url: string): {res : boolean, err : Error | null} {
    const entry = this.failedAttempts.get(url);

    if (!entry) {
      // No failures recorded, proceed with checking
      return {res : false, err : null};
    }

    if (entry.count < FailedAttemptsTracker.MAX_ATTEMPTS) {
      // Failures are below the max threshold, proceed with checking
      return {res : false, err : null};
    }

    if (entry.lastAttempt) {
      const timeSinceLastAttempt = Date.now() - entry.lastAttempt.getTime();
      if (timeSinceLastAttempt >= FailedAttemptsTracker.RESET_TIME) {
        // Enough time has passed, reset the entry and allow checking
        this.failedAttempts.delete(url);
        return {res : false, err : null};
      }
    }

    // Failures reached max threshold and not enough time has passed
    return {res : true, err : entry.err};
  }
}