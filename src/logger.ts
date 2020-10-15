/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

function format(msg?: string): string {
  return `${new Date().toISOString()} ${msg}`;
}

export function log(msg?: string) {
  console.log(format(msg));
}

export function error(msg?: string) {
  console.error('[ERROR]', format(msg));
}
