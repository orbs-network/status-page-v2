/**
 * Copyright 2020 the orbs-network/status-page-v2 authors
 * This file is part of the orbs-network/status-page-v2 library in the Orbs project.
 *
 * This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
 * The above notice should be included in all copies or substantial portions of the software.
 */

import { VirtualChainUrls, NodeServiceUrls, NodeVirtualChainUrls, Service } from '../model/model';

const PrismSuffix = '.prism.orbs.network/';
const SubscriptionUiPrefix = 'subscription.orbs.network/vc';
export function generateVirtualChainUrls(vcId: string): VirtualChainUrls {
  return {
    Prism: `https://${vcId}${PrismSuffix}`,
    Subscription: `https://${SubscriptionUiPrefix}/${vcId}`,
  };
}

export const StatusSuffix = '/status';
const LogsSuffix = '/logs';

export function generateNodeVirtualChainUrls(ip: string, vcid: string): NodeVirtualChainUrls {
  return {
    Status: `http://${ip}/vchains/${vcid}${StatusSuffix}`,
    Management: `http://${ip}:7666/vchains/${vcid}/management`,
    Logs: `http://${ip}/vchains/${vcid}${LogsSuffix}`,
    Version: '',
    Metrics: `http://${ip}/vchains/${vcid}/metrics`,
  };
}

export function generateNodeServiceUrls(ip: string, service: Service): NodeServiceUrls {
  const res = {
    Status: `http://${ip}/services/${service.ServiceUrlName}${StatusSuffix}`,
    Logs: `http://${ip}/services/${service.ServiceUrlName}${LogsSuffix}`,
    Version: '',
    Metrics: '',
  };
  if (service.Name === 'Boyar') res.Metrics = `http://${ip}:9100/metrics`;
  return res;
}

export function updateNodeServiceUrlsWithVersion(urls: NodeServiceUrls, repoUrl: string, version: string) {
  urls.Version = `${repoUrl}${version}`;
}

export function generateNodeManagmentUrl(ip: string) {
  return `http://${ip}:7666/node/management`;
}
