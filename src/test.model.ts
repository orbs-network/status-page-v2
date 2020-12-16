import { HealthLevel, Model } from "./model/model";

export const testModel:Model = {
  "TimeSeconds": 1606730097,
  "Timestamp": "2020-11-30T09:54:56.659Z",
  "GeneralStatuses" : {
    "Monitored URLs Health": {
      "Status": HealthLevel.Green,
      "StatusMsg": "All monitored URLs responded OK",
      "StatusToolTip": "OK"
    }
  },
  "RootNodeStatus": {
    "Status": HealthLevel.Green,
    "StatusMsg": "Status Page: OK",
    "StatusToolTip": "Network Information Up-to-date"
  },
  "VirtualChains": [
    {
      "Id": "1000005",
      "Name": "Core Canary",
      "IsCanary": true,
      "IsCertified": false,
      "GenesisTimeSeconds": 1605035776,
      "ExpirationTimeSeconds": 1620576976,
      "SubscriptionStatus": HealthLevel.Green,
      "SubscriptionStatusToolTip": "",
      "VirtualChainUrls": {
        "Prism": "https://1000005.prism.orbs.network/",
        "Subscription": "https://subscription.orbs.network/vc/1000005"
      }
    },
    {
      "Id": "1000006",
      "Name": "MigratedV1",
      "IsCanary": false,
      "IsCertified": false,
      "GenesisTimeSeconds": 1606061595,
      "ExpirationTimeSeconds": 1621602795,
      "SubscriptionStatus": HealthLevel.Green,
      "SubscriptionStatusToolTip": "",
      "VirtualChainUrls": {
        "Prism": "https://1000006.prism.orbs.network/",
        "Subscription": "https://subscription.orbs.network/vc/1000006"
      }
    }
  ],
  "Services": [
    {
      "Name": "Boyar",
      "ServiceUrlName": "boyar",
      "RepositoryPrefix": "https://github.com/orbs-network/boyarin/tree/"
    },
    {
      "Name": "Signer",
      "ServiceUrlName": "signer",
      "RepositoryPrefix": "https://github.com/orbs-network/signer-service/tree/"
    },
    {
      "Name": "Logger",
      "ServiceUrlName": "logs-service",
      "RepositoryPrefix": "https://github.com/orbs-network/logs-service/tree/"
    },
    {
      "Name": "Management",
      "ServiceUrlName": "management-service",
      "RepositoryPrefix": "https://github.com/orbs-network/management-service/tree/"
    },
    {
      "Name": "EthereumWriter",
      "ServiceUrlName": "ethereum-writer",
      "RepositoryPrefix": "https://github.com/orbs-network/ethereum-writer/tree/"
    }
  ],
  "CommitteeNodes": {
    "c5e624d6824e626a6f14457810e794e4603cfee2": {
      "EthAddress": "c5e624d6824e626a6f14457810e794e4603cfee2",
      "Name": "WhaleCoreStake - ORBS KOREA - 오뽀",
      "Ip": "34.227.204.75",
      "Website": "https://blog.naver.com/fishcorestake",
      "EffectiveStake": 165774541,
      "IsCertified": true,
      "OrbsAddress": "8cd2a24f0c3f50bce2f12c846277491433b47ae0",
      "NodeManagementURL": "http://34.227.204.75:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.686043786Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.227.204.75/vchains/1000005/status",
            "Management": "http://34.227.204.75:7666/vchains/1000005/management",
            "Logs": "http://34.227.204.75/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.227.204.75/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.690805772Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.227.204.75/vchains/1000006/status",
            "Management": "http://34.227.204.75:7666/vchains/1000006/management",
            "Logs": "http://34.227.204.75/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.227.204.75/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:34.609745519Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://34.227.204.75/services/signer/status",
            "Logs": "http://34.227.204.75/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.696Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://34.227.204.75/services/logs-service/status",
            "Logs": "http://34.227.204.75/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.122205 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:28.627Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://34.227.204.75/services/ethereum-writer/status",
            "Logs": "http://34.227.204.75/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.998528139Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://34.227.204.75/services/boyar/status",
            "Logs": "http://34.227.204.75/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://34.227.204.75:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729602 (495 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:56.672Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://34.227.204.75/services/management-service/status",
            "Logs": "http://34.227.204.75/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "63aef7616882f488bca97361d1c24f05b4657ae5": {
      "EthAddress": "63aef7616882f488bca97361d1c24f05b4657ae5",
      "Name": "japan-guardian-altive-orbs-v2",
      "Ip": "54.168.36.177",
      "Website": "https://guardian-japan-orbs.com",
      "EffectiveStake": 102200896,
      "IsCertified": false,
      "OrbsAddress": "b5be5b3c47792cc97931dc8c16b9c18eed6a11ac",
      "NodeManagementURL": "http://54.168.36.177:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.489421401Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.168.36.177/vchains/1000005/status",
            "Management": "http://54.168.36.177:7666/vchains/1000005/management",
            "Logs": "http://54.168.36.177/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.168.36.177/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.474549935Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.168.36.177/vchains/1000006/status",
            "Management": "http://54.168.36.177:7666/vchains/1000006/management",
            "Logs": "http://54.168.36.177/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.168.36.177/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.92568038Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.168.36.177/services/signer/status",
            "Logs": "http://54.168.36.177/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.087Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.168.36.177/services/logs-service/status",
            "Logs": "http://54.168.36.177/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:28.765809935Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.168.36.177/services/boyar/status",
            "Logs": "http://54.168.36.177/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.168.36.177:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 1.042741 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:20.117Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.168.36.177/services/ethereum-writer/status",
            "Logs": "http://54.168.36.177/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729583 (498 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.216Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.168.36.177/services/management-service/status",
            "Logs": "http://54.168.36.177/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "8ddb908c77ccc9cfde28ddf84311cb6fdf3f3125": {
      "EthAddress": "8ddb908c77ccc9cfde28ddf84311cb6fdf3f3125",
      "Name": "Jjang Orbs(짱)",
      "Ip": "52.78.29.172",
      "Website": "https://blog.naver.com/jjang-orbs",
      "EffectiveStake": 98242158,
      "IsCertified": true,
      "OrbsAddress": "cfb0a1637e9af76a544b3066a9ad24d935fcbe0e",
      "NodeManagementURL": "http://52.78.29.172:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:34.79784161Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.78.29.172/vchains/1000005/status",
            "Management": "http://52.78.29.172:7666/vchains/1000005/management",
            "Logs": "http://52.78.29.172/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.78.29.172/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.894025022Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.78.29.172/vchains/1000006/status",
            "Management": "http://52.78.29.172:7666/vchains/1000006/management",
            "Logs": "http://52.78.29.172/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.78.29.172/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.712Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://52.78.29.172/services/logs-service/status",
            "Logs": "http://52.78.29.172/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.303298385Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://52.78.29.172/services/signer/status",
            "Logs": "http://52.78.29.172/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.868646461Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://52.78.29.172/services/boyar/status",
            "Logs": "http://52.78.29.172/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://52.78.29.172:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.412472 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.344Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://52.78.29.172/services/ethereum-writer/status",
            "Logs": "http://52.78.29.172/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729580 (506 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:45.699Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://52.78.29.172/services/management-service/status",
            "Logs": "http://52.78.29.172/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "3d726623456e34e8a7f5567f6249ec4d72cc3595": {
      "EthAddress": "3d726623456e34e8a7f5567f6249ec4d72cc3595",
      "Name": "ORBS 1++흑우",
      "Ip": "3.34.237.131",
      "Website": "https://blog.naver.com/orbs_guardian",
      "EffectiveStake": 46953738,
      "IsCertified": true,
      "OrbsAddress": "28cc6746bf774ab7bab70f703fd857c86efc7835",
      "NodeManagementURL": "http://3.34.237.131:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:45.151504159Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.34.237.131/vchains/1000005/status",
            "Management": "http://3.34.237.131:7666/vchains/1000005/management",
            "Logs": "http://3.34.237.131/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.34.237.131/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:45.170853387Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.34.237.131/vchains/1000006/status",
            "Management": "http://3.34.237.131:7666/vchains/1000006/management",
            "Logs": "http://3.34.237.131/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.34.237.131/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.595865 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:19.512Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://3.34.237.131/services/ethereum-writer/status",
            "Logs": "http://3.34.237.131/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.271Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://3.34.237.131/services/logs-service/status",
            "Logs": "http://3.34.237.131/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.494910044Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://3.34.237.131/services/signer/status",
            "Logs": "http://3.34.237.131/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.301466381Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://3.34.237.131/services/boyar/status",
            "Logs": "http://3.34.237.131/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://3.34.237.131:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729602 (492 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.156Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://3.34.237.131/services/management-service/status",
            "Logs": "http://3.34.237.131/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "f7ae622c77d0580f02bcb2f92380d61e3f6e466c": {
      "EthAddress": "f7ae622c77d0580f02bcb2f92380d61e3f6e466c",
      "Name": "Guardians-of-Orbs",
      "Ip": "54.241.122.39",
      "Website": "https://www.guardians-of-orbs.com/",
      "EffectiveStake": 46728238,
      "IsCertified": true,
      "OrbsAddress": "5bcf21c33a7dfc6e5ed26f7439ef065075ea61cf",
      "NodeManagementURL": "http://54.241.122.39:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.313612566Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.241.122.39/vchains/1000005/status",
            "Management": "http://54.241.122.39:7666/vchains/1000005/management",
            "Logs": "http://54.241.122.39/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.241.122.39/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.3183377Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.241.122.39/vchains/1000006/status",
            "Management": "http://54.241.122.39:7666/vchains/1000006/management",
            "Logs": "http://54.241.122.39/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.241.122.39/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.27976 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:56.710Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.241.122.39/services/ethereum-writer/status",
            "Logs": "http://54.241.122.39/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.353Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.241.122.39/services/logs-service/status",
            "Logs": "http://54.241.122.39/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.375405015Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.241.122.39/services/signer/status",
            "Logs": "http://54.241.122.39/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.40572179Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.241.122.39/services/boyar/status",
            "Logs": "http://54.241.122.39/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.241.122.39:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (492 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.273Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.241.122.39/services/management-service/status",
            "Logs": "http://54.241.122.39/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "0c56b39184e22249e35efcb9394872f0d025256b": {
      "EthAddress": "0c56b39184e22249e35efcb9394872f0d025256b",
      "Name": "AngelSong-of-Orbs",
      "Ip": "13.124.229.86",
      "Website": "https://blog.naver.com/jinan0119",
      "EffectiveStake": 45077585,
      "IsCertified": true,
      "OrbsAddress": "255c1f6c4da768dfd31f27057d38b84de41bcd4d",
      "NodeManagementURL": "http://13.124.229.86:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.959300179Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.124.229.86/vchains/1000005/status",
            "Management": "http://13.124.229.86:7666/vchains/1000005/management",
            "Logs": "http://13.124.229.86/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.124.229.86/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:40.183430469Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.124.229.86/vchains/1000006/status",
            "Management": "http://13.124.229.86:7666/vchains/1000006/management",
            "Logs": "http://13.124.229.86/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.124.229.86/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:57.957Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://13.124.229.86/services/logs-service/status",
            "Logs": "http://13.124.229.86/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.988339954Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://13.124.229.86/services/signer/status",
            "Logs": "http://13.124.229.86/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:56.196256906Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://13.124.229.86/services/boyar/status",
            "Logs": "http://13.124.229.86/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://13.124.229.86:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.759618 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.619Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://13.124.229.86/services/ethereum-writer/status",
            "Logs": "http://13.124.229.86/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729580 (497 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.338Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://13.124.229.86/services/management-service/status",
            "Logs": "http://13.124.229.86/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "f0db4646e4be8e2094cd6d7c6d253a87eec7af58": {
      "EthAddress": "f0db4646e4be8e2094cd6d7c6d253a87eec7af58",
      "Name": "Good relation-Guardian(굿가)",
      "Ip": "15.165.22.8",
      "Website": "https://blog.naver.com/emfla2272",
      "EffectiveStake": 44928316,
      "IsCertified": true,
      "OrbsAddress": "90e544fa6f0029e516ee433e736f1cbcdefc2630",
      "NodeManagementURL": "http://15.165.22.8:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:39.700960375Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.22.8/vchains/1000005/status",
            "Management": "http://15.165.22.8:7666/vchains/1000005/management",
            "Logs": "http://15.165.22.8/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.22.8/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:39.703902868Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.22.8/vchains/1000006/status",
            "Management": "http://15.165.22.8:7666/vchains/1000006/management",
            "Logs": "http://15.165.22.8/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.22.8/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.351941298Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://15.165.22.8/services/signer/status",
            "Logs": "http://15.165.22.8/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.632Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://15.165.22.8/services/logs-service/status",
            "Logs": "http://15.165.22.8/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.662459212Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://15.165.22.8/services/boyar/status",
            "Logs": "http://15.165.22.8/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://15.165.22.8:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.497958 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:16.910Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://15.165.22.8/services/ethereum-writer/status",
            "Logs": "http://15.165.22.8/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729580 (503 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.646Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://15.165.22.8/services/management-service/status",
            "Logs": "http://15.165.22.8/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "0874bc1383958e2475df73dc68c4f09658e23777": {
      "EthAddress": "0874bc1383958e2475df73dc68c4f09658e23777",
      "Name": "Wings Stiftung",
      "Ip": "46.101.165.46",
      "Website": "https://wingsfoundation.ch",
      "EffectiveStake": 19441229,
      "IsCertified": false,
      "OrbsAddress": "067a8afdc6d7bafa0ccaa5bb2da867f454a34dfa",
      "NodeManagementURL": "http://46.101.165.46:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.176453729Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.101.165.46/vchains/1000005/status",
            "Management": "http://46.101.165.46:7666/vchains/1000005/management",
            "Logs": "http://46.101.165.46/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.101.165.46/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.44866359Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.101.165.46/vchains/1000006/status",
            "Management": "http://46.101.165.46:7666/vchains/1000006/management",
            "Logs": "http://46.101.165.46/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.101.165.46/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.578238 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:39.538Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://46.101.165.46/services/ethereum-writer/status",
            "Logs": "http://46.101.165.46/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.130Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://46.101.165.46/services/logs-service/status",
            "Logs": "http://46.101.165.46/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.26972709Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://46.101.165.46/services/signer/status",
            "Logs": "http://46.101.165.46/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.103768447Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://46.101.165.46/services/boyar/status",
            "Logs": "http://46.101.165.46/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://46.101.165.46:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729657 (435 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.783Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://46.101.165.46/services/management-service/status",
            "Logs": "http://46.101.165.46/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "17fe98a222c41217c51c823352537dc542ad06ef": {
      "EthAddress": "17fe98a222c41217c51c823352537dc542ad06ef",
      "Name": "FREEMAN",
      "Ip": "13.125.31.152",
      "Website": "https://blog.naver.com/freeman-k",
      "EffectiveStake": 14552048,
      "IsCertified": true,
      "OrbsAddress": "21ff8c5d4fce6912272dc424241811daec5fdbf3",
      "NodeManagementURL": "http://13.125.31.152:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.527929884Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.125.31.152/vchains/1000005/status",
            "Management": "http://13.125.31.152:7666/vchains/1000005/management",
            "Logs": "http://13.125.31.152/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.125.31.152/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.517657564Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.125.31.152/vchains/1000006/status",
            "Management": "http://13.125.31.152:7666/vchains/1000006/management",
            "Logs": "http://13.125.31.152/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.125.31.152/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.896Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://13.125.31.152/services/logs-service/status",
            "Logs": "http://13.125.31.152/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.647295 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:52:57.985Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://13.125.31.152/services/ethereum-writer/status",
            "Logs": "http://13.125.31.152/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:32.913808196Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://13.125.31.152/services/signer/status",
            "Logs": "http://13.125.31.152/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.694005021Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://13.125.31.152/services/boyar/status",
            "Logs": "http://13.125.31.152/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://13.125.31.152:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (489 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.838Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://13.125.31.152/services/management-service/status",
            "Logs": "http://13.125.31.152/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "460d922239030a83f419f2fb090bf901b628ec31": {
      "EthAddress": "460d922239030a83f419f2fb090bf901b628ec31",
      "Name": "test-guardian1-orbs-beta",
      "Ip": "34.255.138.28",
      "Website": "www.orbs.com",
      "EffectiveStake": 10,
      "IsCertified": false,
      "OrbsAddress": "19ef9290b8cf5ec5e72f9fde3e044b37736ec0c7",
      "NodeManagementURL": "http://34.255.138.28:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:44.845500941Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.255.138.28/vchains/1000005/status",
            "Management": "http://34.255.138.28:7666/vchains/1000005/management",
            "Logs": "http://34.255.138.28/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.255.138.28/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:34.174211349Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.255.138.28/vchains/1000006/status",
            "Management": "http://34.255.138.28:7666/vchains/1000006/management",
            "Logs": "http://34.255.138.28/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.255.138.28/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.657Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://34.255.138.28/services/logs-service/status",
            "Logs": "http://34.255.138.28/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.762746345Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://34.255.138.28/services/signer/status",
            "Logs": "http://34.255.138.28/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.045787 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Red,
          "StatusToolTip": "Eth balance below 0.1: 0.045787 ETH.",
          "Timestamp": "2020-11-30T09:54:25.037Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://34.255.138.28/services/ethereum-writer/status",
            "Logs": "http://34.255.138.28/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.913056654Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://34.255.138.28/services/boyar/status",
            "Logs": "http://34.255.138.28/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://34.255.138.28:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729583 (499 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.538Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://34.255.138.28/services/management-service/status",
            "Logs": "http://34.255.138.28/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "4aca0c63e351b2ea44ee628425710e933b5b3396": {
      "EthAddress": "4aca0c63e351b2ea44ee628425710e933b5b3396",
      "Name": "0xCORE",
      "Ip": "52.9.29.25",
      "Website": "https://github.com/orbs-network/orbs-network-go",
      "EffectiveStake": 1000,
      "IsCertified": false,
      "OrbsAddress": "65e6a0c648e8a3826e9b1b19c29e91f5b5c8296f",
      "NodeManagementURL": "http://52.9.29.25:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.426383062Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.9.29.25/vchains/1000005/status",
            "Management": "http://52.9.29.25:7666/vchains/1000005/management",
            "Logs": "http://52.9.29.25/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.9.29.25/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.44450414Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.9.29.25/vchains/1000006/status",
            "Management": "http://52.9.29.25:7666/vchains/1000006/management",
            "Logs": "http://52.9.29.25/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.9.29.25/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:52.77779716Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://52.9.29.25/services/signer/status",
            "Logs": "http://52.9.29.25/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.776049983Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://52.9.29.25/services/boyar/status",
            "Logs": "http://52.9.29.25/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://52.9.29.25:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.188595 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:11.502Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://52.9.29.25/services/ethereum-writer/status",
            "Logs": "http://52.9.29.25/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.501Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://52.9.29.25/services/logs-service/status",
            "Logs": "http://52.9.29.25/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729583 (501 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:44.426Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://52.9.29.25/services/management-service/status",
            "Logs": "http://52.9.29.25/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "5aefc9c2960635b2b1209d4330c84c15d9983ff5": {
      "EthAddress": "5aefc9c2960635b2b1209d4330c84c15d9983ff5",
      "Name": "Citadel.one",
      "Ip": "84.201.129.47",
      "Website": "https://citadel.one/",
      "EffectiveStake": 11781,
      "IsCertified": true,
      "OrbsAddress": "f1285a9cdcc2df8708ae780f7773be74ce1e13f1",
      "NodeManagementURL": "http://84.201.129.47:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.474025523Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.129.47/vchains/1000005/status",
            "Management": "http://84.201.129.47:7666/vchains/1000005/management",
            "Logs": "http://84.201.129.47/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.129.47/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.230232185Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.129.47/vchains/1000006/status",
            "Management": "http://84.201.129.47:7666/vchains/1000006/management",
            "Logs": "http://84.201.129.47/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.129.47/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.370114758Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://84.201.129.47/services/signer/status",
            "Logs": "http://84.201.129.47/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.972707 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.116Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://84.201.129.47/services/ethereum-writer/status",
            "Logs": "http://84.201.129.47/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.976Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://84.201.129.47/services/logs-service/status",
            "Logs": "http://84.201.129.47/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.546120474Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://84.201.129.47/services/boyar/status",
            "Logs": "http://84.201.129.47/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://84.201.129.47:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (495 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:44.007Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://84.201.129.47/services/management-service/status",
            "Logs": "http://84.201.129.47/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "69c57da3914693dbc5e96ff6c37216e70c6fbbc9": {
      "EthAddress": "69c57da3914693dbc5e96ff6c37216e70c6fbbc9",
      "Name": "Paradigm",
      "Ip": "130.193.51.109",
      "Website": "https://paradigmfund.io",
      "EffectiveStake": 1436460,
      "IsCertified": false,
      "OrbsAddress": "6412cb7c5aea5e5e822a45c51e2a9c0e4027366f",
      "NodeManagementURL": "http://130.193.51.109:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:55.770682507Z",
          "Version": "v2.0.13",
          "BlockHeight": 177316,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://130.193.51.109/vchains/1000005/status",
            "Management": "http://130.193.51.109:7666/vchains/1000005/management",
            "Logs": "http://130.193.51.109/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://130.193.51.109/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.967152314Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://130.193.51.109/vchains/1000006/status",
            "Management": "http://130.193.51.109:7666/vchains/1000006/management",
            "Logs": "http://130.193.51.109/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://130.193.51.109/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:56.964Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://130.193.51.109/services/logs-service/status",
            "Logs": "http://130.193.51.109/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.751295673Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://130.193.51.109/services/signer/status",
            "Logs": "http://130.193.51.109/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.838694 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:23.990Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://130.193.51.109/services/ethereum-writer/status",
            "Logs": "http://130.193.51.109/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.990343146Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://130.193.51.109/services/boyar/status",
            "Logs": "http://130.193.51.109/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://130.193.51.109:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729657 (445 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.072Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://130.193.51.109/services/management-service/status",
            "Logs": "http://130.193.51.109/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "6dda3d258e21abc37668e82ae543e8c77567f220": {
      "EthAddress": "6dda3d258e21abc37668e82ae543e8c77567f220",
      "Name": "DELIGHT",
      "Ip": "15.164.83.34",
      "Website": "https://delightlabs.io",
      "EffectiveStake": 2604460,
      "IsCertified": true,
      "OrbsAddress": "79f088400728c380412b3c351ff65d1e06e40d68",
      "NodeManagementURL": "http://15.164.83.34:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:31.544009374Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.164.83.34/vchains/1000005/status",
            "Management": "http://15.164.83.34:7666/vchains/1000005/management",
            "Logs": "http://15.164.83.34/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.164.83.34/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.316561428Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.164.83.34/vchains/1000006/status",
            "Management": "http://15.164.83.34:7666/vchains/1000006/management",
            "Logs": "http://15.164.83.34/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.164.83.34/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.697Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://15.164.83.34/services/logs-service/status",
            "Logs": "http://15.164.83.34/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.726817405Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://15.164.83.34/services/boyar/status",
            "Logs": "http://15.164.83.34/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://15.164.83.34:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.632015 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:55.170Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://15.164.83.34/services/ethereum-writer/status",
            "Logs": "http://15.164.83.34/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.088829224Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://15.164.83.34/services/signer/status",
            "Logs": "http://15.164.83.34/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729657 (444 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:01.122Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://15.164.83.34/services/management-service/status",
            "Logs": "http://15.164.83.34/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "77f20b33b2bc5637f8abc6a87aeea43b1b520591": {
      "EthAddress": "77f20b33b2bc5637f8abc6a87aeea43b1b520591",
      "Name": "test-guardian3-orbs-beta",
      "Ip": "54.154.100.33",
      "Website": "www.orbs.com",
      "EffectiveStake": 9,
      "IsCertified": false,
      "OrbsAddress": "af3411fad863bc2e6d082d809355ac321f0d3d2b",
      "NodeManagementURL": "http://54.154.100.33:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.759466611Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.154.100.33/vchains/1000005/status",
            "Management": "http://54.154.100.33:7666/vchains/1000005/management",
            "Logs": "http://54.154.100.33/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.154.100.33/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.751383901Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.154.100.33/vchains/1000006/status",
            "Management": "http://54.154.100.33:7666/vchains/1000006/management",
            "Logs": "http://54.154.100.33/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.154.100.33/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.083753 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Red,
          "StatusToolTip": "Eth balance below 0.1: 0.083753 ETH.",
          "Timestamp": "2020-11-30T09:54:21.612Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.154.100.33/services/ethereum-writer/status",
            "Logs": "http://54.154.100.33/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (493 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.215Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.154.100.33/services/management-service/status",
            "Logs": "http://54.154.100.33/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.514332295Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.154.100.33/services/signer/status",
            "Logs": "http://54.154.100.33/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.834Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.154.100.33/services/logs-service/status",
            "Logs": "http://54.154.100.33/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.725131809Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.154.100.33/services/boyar/status",
            "Logs": "http://54.154.100.33/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.154.100.33:9100/metrics"
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "7f0e5488a651c08f84df8e4088303c94c58a728b": {
      "EthAddress": "7f0e5488a651c08f84df8e4088303c94c58a728b",
      "Name": "Guardians of Blockchain (가.오.블)",
      "Ip": "15.165.194.81",
      "Website": "https://www.guardians-of-blockchain.com",
      "EffectiveStake": 26068868,
      "IsCertified": true,
      "OrbsAddress": "0838b80529ff7a785e1bd644c3bafc32f6d7811d",
      "NodeManagementURL": "http://15.165.194.81:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.803710666Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.194.81/vchains/1000005/status",
            "Management": "http://15.165.194.81:7666/vchains/1000005/management",
            "Logs": "http://15.165.194.81/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.194.81/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.801889352Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.194.81/vchains/1000006/status",
            "Management": "http://15.165.194.81:7666/vchains/1000006/management",
            "Logs": "http://15.165.194.81/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.194.81/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.442002 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:51.963Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://15.165.194.81/services/ethereum-writer/status",
            "Logs": "http://15.165.194.81/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.626503761Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://15.165.194.81/services/signer/status",
            "Logs": "http://15.165.194.81/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.839Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://15.165.194.81/services/logs-service/status",
            "Logs": "http://15.165.194.81/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.532478638Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://15.165.194.81/services/boyar/status",
            "Logs": "http://15.165.194.81/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://15.165.194.81:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729595 (511 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:05.801Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://15.165.194.81/services/management-service/status",
            "Logs": "http://15.165.194.81/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "9b3853cc5734f18ab95e99e6fa4e7fb5da1e1186": {
      "EthAddress": "9b3853cc5734f18ab95e99e6fa4e7fb5da1e1186",
      "Name": "MollBBang",
      "Ip": "3.35.184.213",
      "Website": "https://blog.naver.com/mollbbang",
      "EffectiveStake": 13344,
      "IsCertified": false,
      "OrbsAddress": "b226f469841d193829fa54661eac4ba5ce91a41e",
      "NodeManagementURL": "http://3.35.184.213:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.08605226Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.35.184.213/vchains/1000005/status",
            "Management": "http://3.35.184.213:7666/vchains/1000005/management",
            "Logs": "http://3.35.184.213/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.35.184.213/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.140704869Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.35.184.213/vchains/1000006/status",
            "Management": "http://3.35.184.213:7666/vchains/1000006/management",
            "Logs": "http://3.35.184.213/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.35.184.213/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:32.339149309Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://3.35.184.213/services/boyar/status",
            "Logs": "http://3.35.184.213/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://3.35.184.213:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.960827 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:55.536Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://3.35.184.213/services/ethereum-writer/status",
            "Logs": "http://3.35.184.213/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (489 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.485Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://3.35.184.213/services/management-service/status",
            "Logs": "http://3.35.184.213/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.592Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://3.35.184.213/services/logs-service/status",
            "Logs": "http://3.35.184.213/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.228059765Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://3.35.184.213/services/signer/status",
            "Logs": "http://3.35.184.213/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "b844166d6c29f277b825265b5e1d8855901c1d7b": {
      "EthAddress": "b844166d6c29f277b825265b5e1d8855901c1d7b",
      "Name": "test-guardian4-orbs-beta",
      "Ip": "46.137.54.150",
      "Website": "www.orbs.com",
      "EffectiveStake": 10,
      "IsCertified": false,
      "OrbsAddress": "251549f620248d06b93b714e386b1526a774c89e",
      "NodeManagementURL": "http://46.137.54.150:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:52.867288417Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.137.54.150/vchains/1000005/status",
            "Management": "http://46.137.54.150:7666/vchains/1000005/management",
            "Logs": "http://46.137.54.150/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.137.54.150/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.223594708Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.137.54.150/vchains/1000006/status",
            "Management": "http://46.137.54.150:7666/vchains/1000006/management",
            "Logs": "http://46.137.54.150/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.137.54.150/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.128591 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:36.537Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://46.137.54.150/services/ethereum-writer/status",
            "Logs": "http://46.137.54.150/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.331Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://46.137.54.150/services/logs-service/status",
            "Logs": "http://46.137.54.150/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.668674902Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://46.137.54.150/services/signer/status",
            "Logs": "http://46.137.54.150/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.494254921Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://46.137.54.150/services/boyar/status",
            "Logs": "http://46.137.54.150/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://46.137.54.150:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729602 (500 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.493Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://46.137.54.150/services/management-service/status",
            "Logs": "http://46.137.54.150/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "c82ec0f3c834d337c51c9375a1c0a65ce7aadaec": {
      "EthAddress": "c82ec0f3c834d337c51c9375a1c0a65ce7aadaec",
      "Name": "ORBS-POS",
      "Ip": "84.201.173.154",
      "Website": "http://orbs-pos.info/",
      "EffectiveStake": 663473,
      "IsCertified": true,
      "OrbsAddress": "1ecaa5dd10d729b5e48ec40d36fd26e07419cc32",
      "NodeManagementURL": "http://84.201.173.154:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.812527739Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.173.154/vchains/1000005/status",
            "Management": "http://84.201.173.154:7666/vchains/1000005/management",
            "Logs": "http://84.201.173.154/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.173.154/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.982704406Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.173.154/vchains/1000006/status",
            "Management": "http://84.201.173.154:7666/vchains/1000006/management",
            "Logs": "http://84.201.173.154/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.173.154/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.682967588Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://84.201.173.154/services/signer/status",
            "Logs": "http://84.201.173.154/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.571Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://84.201.173.154/services/logs-service/status",
            "Logs": "http://84.201.173.154/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.247152751Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://84.201.173.154/services/boyar/status",
            "Logs": "http://84.201.173.154/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://84.201.173.154:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.744794 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:12.622Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://84.201.173.154/services/ethereum-writer/status",
            "Logs": "http://84.201.173.154/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (504 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.219Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://84.201.173.154/services/management-service/status",
            "Logs": "http://84.201.173.154/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "cca877408c68878ea02afd1c441cdaaa05d061f1": {
      "EthAddress": "cca877408c68878ea02afd1c441cdaaa05d061f1",
      "Name": "chainvalid8",
      "Ip": "54.219.18.44",
      "Website": "https://chainvalid8.com",
      "EffectiveStake": 3025922,
      "IsCertified": true,
      "OrbsAddress": "a0015ef8b6ea6dca2b55963d0b87ae1cdfd9771e",
      "NodeManagementURL": "http://54.219.18.44:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.624268857Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.219.18.44/vchains/1000005/status",
            "Management": "http://54.219.18.44:7666/vchains/1000005/management",
            "Logs": "http://54.219.18.44/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.219.18.44/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.41789038Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.219.18.44/vchains/1000006/status",
            "Management": "http://54.219.18.44:7666/vchains/1000006/management",
            "Logs": "http://54.219.18.44/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.219.18.44/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.117Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.219.18.44/services/logs-service/status",
            "Logs": "http://54.219.18.44/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.163416729Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.219.18.44/services/signer/status",
            "Logs": "http://54.219.18.44/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.809010337Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.219.18.44/services/boyar/status",
            "Logs": "http://54.219.18.44/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.219.18.44:9100/metrics"
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.901212 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.494Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.219.18.44/services/ethereum-writer/status",
            "Logs": "http://54.219.18.44/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (509 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.480Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.219.18.44/services/management-service/status",
            "Logs": "http://54.219.18.44/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "f058ccfb2324310c33e8fd9a1dda8e99c8beda59": {
      "EthAddress": "f058ccfb2324310c33e8fd9a1dda8e99c8beda59",
      "Name": "Bitgosu",
      "Ip": "54.180.3.15",
      "Website": "https://bitgosu.info",
      "EffectiveStake": 23233770,
      "IsCertified": true,
      "OrbsAddress": "400ab9c53447b47d92d07c5dea6bb3e472756e4d",
      "NodeManagementURL": "http://54.180.3.15:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.211940482Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.180.3.15/vchains/1000005/status",
            "Management": "http://54.180.3.15:7666/vchains/1000005/management",
            "Logs": "http://54.180.3.15/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.180.3.15/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.715006663Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.180.3.15/vchains/1000006/status",
            "Management": "http://54.180.3.15:7666/vchains/1000006/management",
            "Logs": "http://54.180.3.15/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.180.3.15/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:29.370208073Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.180.3.15/services/signer/status",
            "Logs": "http://54.180.3.15/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.739044 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:17.531Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.180.3.15/services/ethereum-writer/status",
            "Logs": "http://54.180.3.15/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.600Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.180.3.15/services/logs-service/status",
            "Logs": "http://54.180.3.15/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.629138059Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.180.3.15/services/boyar/status",
            "Logs": "http://54.180.3.15/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.180.3.15:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (516 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:04.732Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.180.3.15/services/management-service/status",
            "Logs": "http://54.180.3.15/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    },
    "f64443d47bfe0305e4cafaba4635a19da730ef51": {
      "EthAddress": "f64443d47bfe0305e4cafaba4635a19da730ef51",
      "Name": "test_guardian2-orbs-beta",
      "Ip": "54.220.78.16",
      "Website": "www.orbs.com",
      "EffectiveStake": 10,
      "IsCertified": false,
      "OrbsAddress": "1aa712bb53729d10debdcdc69e807d47b08009c9",
      "NodeManagementURL": "http://54.220.78.16:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.444625001Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.220.78.16/vchains/1000005/status",
            "Management": "http://54.220.78.16:7666/vchains/1000005/management",
            "Logs": "http://54.220.78.16/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.220.78.16/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.459990895Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.220.78.16/vchains/1000006/status",
            "Management": "http://54.220.78.16:7666/vchains/1000006/management",
            "Logs": "http://54.220.78.16/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.220.78.16/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Management": {
          "StatusMsg": "RefTime = 1606729595 (493 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.395Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.220.78.16/services/management-service/status",
            "Logs": "http://54.220.78.16/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:52.330Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.220.78.16/services/logs-service/status",
            "Logs": "http://54.220.78.16/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.132777 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:22.828Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.220.78.16/services/ethereum-writer/status",
            "Logs": "http://54.220.78.16/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.929954721Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.220.78.16/services/signer/status",
            "Logs": "http://54.220.78.16/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.599187615Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.220.78.16/services/boyar/status",
            "Logs": "http://54.220.78.16/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.220.78.16:9100/metrics"
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "NodeVirtualChainBadReputations": {
          "1000005": 0,
          "1000006": 0
        },
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    }
  },
  "StandByNodes": {
    "ca0ff0479bd7f52e55e65da7b76074b477b734b3": {
      "EthAddress": "ca0ff0479bd7f52e55e65da7b76074b477b734b3",
      "Name": "0xAUDIT",
      "Ip": "18.132.102.185",
      "Website": "https://github.com/orbs-network/orbs-network-go",
      "EffectiveStake": 0,
      "IsCertified": false,
      "OrbsAddress": "395f559948e43b45e632889c74b35ac742540e48",
      "NodeManagementURL": "http://18.132.102.185:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.632727277Z",
          "Version": "v2.0.13",
          "BlockHeight": 177312,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://18.132.102.185/vchains/1000005/status",
            "Management": "http://18.132.102.185:7666/vchains/1000005/management",
            "Logs": "http://18.132.102.185/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://18.132.102.185/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:35.35964805Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://18.132.102.185/vchains/1000006/status",
            "Management": "http://18.132.102.185:7666/vchains/1000006/management",
            "Logs": "http://18.132.102.185/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://18.132.102.185/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.714Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://18.132.102.185/services/logs-service/status",
            "Logs": "http://18.132.102.185/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.596576 ETH, TxFeesIn10Days = 0.001447 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:44.194Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://18.132.102.185/services/ethereum-writer/status",
            "Logs": "http://18.132.102.185/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.373461777Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://18.132.102.185/services/signer/status",
            "Logs": "http://18.132.102.185/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.97859222Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://18.132.102.185/services/boyar/status",
            "Logs": "http://18.132.102.185/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://18.132.102.185:9100/metrics"
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729595 (507 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.485Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://18.132.102.185/services/management-service/status",
            "Logs": "http://18.132.102.185/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Green,
        "ReputationToolTip": ""
      }
    }
  },
  "AllRegisteredNodes": {
    "460d922239030a83f419f2fb090bf901b628ec31": {
      "EthAddress": "460d922239030a83f419f2fb090bf901b628ec31",
      "Name": "test-guardian1-orbs-beta",
      "Ip": "34.255.138.28",
      "Website": "www.orbs.com",
      "EffectiveStake": 10,
      "IsCertified": false,
      "OrbsAddress": "19ef9290b8cf5ec5e72f9fde3e044b37736ec0c7",
      "NodeManagementURL": "http://34.255.138.28:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:44.845500941Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.255.138.28/vchains/1000005/status",
            "Management": "http://34.255.138.28:7666/vchains/1000005/management",
            "Logs": "http://34.255.138.28/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.255.138.28/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:34.174211349Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.255.138.28/vchains/1000006/status",
            "Management": "http://34.255.138.28:7666/vchains/1000006/management",
            "Logs": "http://34.255.138.28/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.255.138.28/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.913056654Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://34.255.138.28/services/boyar/status",
            "Logs": "http://34.255.138.28/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://34.255.138.28:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.762746345Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://34.255.138.28/services/signer/status",
            "Logs": "http://34.255.138.28/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.657Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://34.255.138.28/services/logs-service/status",
            "Logs": "http://34.255.138.28/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729583 (499 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.538Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://34.255.138.28/services/management-service/status",
            "Logs": "http://34.255.138.28/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.045787 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Red,
          "StatusToolTip": "Eth balance below 0.1: 0.045787 ETH.",
          "Timestamp": "2020-11-30T09:54:25.037Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://34.255.138.28/services/ethereum-writer/status",
            "Logs": "http://34.255.138.28/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "f64443d47bfe0305e4cafaba4635a19da730ef51": {
      "EthAddress": "f64443d47bfe0305e4cafaba4635a19da730ef51",
      "Name": "test_guardian2-orbs-beta",
      "Ip": "54.220.78.16",
      "Website": "www.orbs.com",
      "EffectiveStake": 10,
      "IsCertified": false,
      "OrbsAddress": "1aa712bb53729d10debdcdc69e807d47b08009c9",
      "NodeManagementURL": "http://54.220.78.16:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.444625001Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.220.78.16/vchains/1000005/status",
            "Management": "http://54.220.78.16:7666/vchains/1000005/management",
            "Logs": "http://54.220.78.16/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.220.78.16/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.459990895Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.220.78.16/vchains/1000006/status",
            "Management": "http://54.220.78.16:7666/vchains/1000006/management",
            "Logs": "http://54.220.78.16/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.220.78.16/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.599187615Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.220.78.16/services/boyar/status",
            "Logs": "http://54.220.78.16/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.220.78.16:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.929954721Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.220.78.16/services/signer/status",
            "Logs": "http://54.220.78.16/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:52.330Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.220.78.16/services/logs-service/status",
            "Logs": "http://54.220.78.16/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729595 (493 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.395Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.220.78.16/services/management-service/status",
            "Logs": "http://54.220.78.16/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.132777 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:22.828Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.220.78.16/services/ethereum-writer/status",
            "Logs": "http://54.220.78.16/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "77f20b33b2bc5637f8abc6a87aeea43b1b520591": {
      "EthAddress": "77f20b33b2bc5637f8abc6a87aeea43b1b520591",
      "Name": "test-guardian3-orbs-beta",
      "Ip": "54.154.100.33",
      "Website": "www.orbs.com",
      "EffectiveStake": 9,
      "IsCertified": false,
      "OrbsAddress": "af3411fad863bc2e6d082d809355ac321f0d3d2b",
      "NodeManagementURL": "http://54.154.100.33:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.759466611Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.154.100.33/vchains/1000005/status",
            "Management": "http://54.154.100.33:7666/vchains/1000005/management",
            "Logs": "http://54.154.100.33/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.154.100.33/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.751383901Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.154.100.33/vchains/1000006/status",
            "Management": "http://54.154.100.33:7666/vchains/1000006/management",
            "Logs": "http://54.154.100.33/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.154.100.33/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.725131809Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.154.100.33/services/boyar/status",
            "Logs": "http://54.154.100.33/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.154.100.33:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.514332295Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.154.100.33/services/signer/status",
            "Logs": "http://54.154.100.33/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.834Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.154.100.33/services/logs-service/status",
            "Logs": "http://54.154.100.33/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (493 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.215Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.154.100.33/services/management-service/status",
            "Logs": "http://54.154.100.33/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.083753 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Red,
          "StatusToolTip": "Eth balance below 0.1: 0.083753 ETH.",
          "Timestamp": "2020-11-30T09:54:21.612Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.154.100.33/services/ethereum-writer/status",
            "Logs": "http://54.154.100.33/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "b844166d6c29f277b825265b5e1d8855901c1d7b": {
      "EthAddress": "b844166d6c29f277b825265b5e1d8855901c1d7b",
      "Name": "test-guardian4-orbs-beta",
      "Ip": "46.137.54.150",
      "Website": "www.orbs.com",
      "EffectiveStake": 10,
      "IsCertified": false,
      "OrbsAddress": "251549f620248d06b93b714e386b1526a774c89e",
      "NodeManagementURL": "http://46.137.54.150:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:52.867288417Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.137.54.150/vchains/1000005/status",
            "Management": "http://46.137.54.150:7666/vchains/1000005/management",
            "Logs": "http://46.137.54.150/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.137.54.150/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.223594708Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.137.54.150/vchains/1000006/status",
            "Management": "http://46.137.54.150:7666/vchains/1000006/management",
            "Logs": "http://46.137.54.150/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.137.54.150/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.494254921Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://46.137.54.150/services/boyar/status",
            "Logs": "http://46.137.54.150/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://46.137.54.150:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.668674902Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://46.137.54.150/services/signer/status",
            "Logs": "http://46.137.54.150/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.331Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://46.137.54.150/services/logs-service/status",
            "Logs": "http://46.137.54.150/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729602 (500 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.493Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://46.137.54.150/services/management-service/status",
            "Logs": "http://46.137.54.150/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.128591 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:36.537Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://46.137.54.150/services/ethereum-writer/status",
            "Logs": "http://46.137.54.150/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "6dda3d258e21abc37668e82ae543e8c77567f220": {
      "EthAddress": "6dda3d258e21abc37668e82ae543e8c77567f220",
      "Name": "DELIGHT",
      "Ip": "15.164.83.34",
      "Website": "https://delightlabs.io",
      "EffectiveStake": 2604460,
      "IsCertified": true,
      "OrbsAddress": "79f088400728c380412b3c351ff65d1e06e40d68",
      "NodeManagementURL": "http://15.164.83.34:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:31.544009374Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.164.83.34/vchains/1000005/status",
            "Management": "http://15.164.83.34:7666/vchains/1000005/management",
            "Logs": "http://15.164.83.34/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.164.83.34/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.316561428Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.164.83.34/vchains/1000006/status",
            "Management": "http://15.164.83.34:7666/vchains/1000006/management",
            "Logs": "http://15.164.83.34/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.164.83.34/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.726817405Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://15.164.83.34/services/boyar/status",
            "Logs": "http://15.164.83.34/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://15.164.83.34:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.088829224Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://15.164.83.34/services/signer/status",
            "Logs": "http://15.164.83.34/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.697Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://15.164.83.34/services/logs-service/status",
            "Logs": "http://15.164.83.34/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729657 (444 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:01.122Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://15.164.83.34/services/management-service/status",
            "Logs": "http://15.164.83.34/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.632015 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:55.170Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://15.164.83.34/services/ethereum-writer/status",
            "Logs": "http://15.164.83.34/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "c5e624d6824e626a6f14457810e794e4603cfee2": {
      "EthAddress": "c5e624d6824e626a6f14457810e794e4603cfee2",
      "Name": "WhaleCoreStake - ORBS KOREA - 오뽀",
      "Ip": "34.227.204.75",
      "Website": "https://blog.naver.com/fishcorestake",
      "EffectiveStake": 165774541,
      "IsCertified": true,
      "OrbsAddress": "8cd2a24f0c3f50bce2f12c846277491433b47ae0",
      "NodeManagementURL": "http://34.227.204.75:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.686043786Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.227.204.75/vchains/1000005/status",
            "Management": "http://34.227.204.75:7666/vchains/1000005/management",
            "Logs": "http://34.227.204.75/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.227.204.75/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.690805772Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://34.227.204.75/vchains/1000006/status",
            "Management": "http://34.227.204.75:7666/vchains/1000006/management",
            "Logs": "http://34.227.204.75/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://34.227.204.75/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.998528139Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://34.227.204.75/services/boyar/status",
            "Logs": "http://34.227.204.75/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://34.227.204.75:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:34.609745519Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://34.227.204.75/services/signer/status",
            "Logs": "http://34.227.204.75/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.696Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://34.227.204.75/services/logs-service/status",
            "Logs": "http://34.227.204.75/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729602 (495 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:56.672Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://34.227.204.75/services/management-service/status",
            "Logs": "http://34.227.204.75/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.122205 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:28.627Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://34.227.204.75/services/ethereum-writer/status",
            "Logs": "http://34.227.204.75/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "f7ae622c77d0580f02bcb2f92380d61e3f6e466c": {
      "EthAddress": "f7ae622c77d0580f02bcb2f92380d61e3f6e466c",
      "Name": "Guardians-of-Orbs",
      "Ip": "54.241.122.39",
      "Website": "https://www.guardians-of-orbs.com/",
      "EffectiveStake": 46728238,
      "IsCertified": true,
      "OrbsAddress": "5bcf21c33a7dfc6e5ed26f7439ef065075ea61cf",
      "NodeManagementURL": "http://54.241.122.39:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.313612566Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.241.122.39/vchains/1000005/status",
            "Management": "http://54.241.122.39:7666/vchains/1000005/management",
            "Logs": "http://54.241.122.39/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.241.122.39/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.3183377Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.241.122.39/vchains/1000006/status",
            "Management": "http://54.241.122.39:7666/vchains/1000006/management",
            "Logs": "http://54.241.122.39/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.241.122.39/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.40572179Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.241.122.39/services/boyar/status",
            "Logs": "http://54.241.122.39/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.241.122.39:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.375405015Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.241.122.39/services/signer/status",
            "Logs": "http://54.241.122.39/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.353Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.241.122.39/services/logs-service/status",
            "Logs": "http://54.241.122.39/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (492 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.273Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.241.122.39/services/management-service/status",
            "Logs": "http://54.241.122.39/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.27976 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:56.710Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.241.122.39/services/ethereum-writer/status",
            "Logs": "http://54.241.122.39/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "0874bc1383958e2475df73dc68c4f09658e23777": {
      "EthAddress": "0874bc1383958e2475df73dc68c4f09658e23777",
      "Name": "Wings Stiftung",
      "Ip": "46.101.165.46",
      "Website": "https://wingsfoundation.ch",
      "EffectiveStake": 19441229,
      "IsCertified": false,
      "OrbsAddress": "067a8afdc6d7bafa0ccaa5bb2da867f454a34dfa",
      "NodeManagementURL": "http://46.101.165.46:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.176453729Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.101.165.46/vchains/1000005/status",
            "Management": "http://46.101.165.46:7666/vchains/1000005/management",
            "Logs": "http://46.101.165.46/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.101.165.46/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.44866359Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://46.101.165.46/vchains/1000006/status",
            "Management": "http://46.101.165.46:7666/vchains/1000006/management",
            "Logs": "http://46.101.165.46/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://46.101.165.46/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.103768447Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://46.101.165.46/services/boyar/status",
            "Logs": "http://46.101.165.46/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://46.101.165.46:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.26972709Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://46.101.165.46/services/signer/status",
            "Logs": "http://46.101.165.46/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.130Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://46.101.165.46/services/logs-service/status",
            "Logs": "http://46.101.165.46/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729657 (435 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.783Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://46.101.165.46/services/management-service/status",
            "Logs": "http://46.101.165.46/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.578238 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:39.538Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://46.101.165.46/services/ethereum-writer/status",
            "Logs": "http://46.101.165.46/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "7f0e5488a651c08f84df8e4088303c94c58a728b": {
      "EthAddress": "7f0e5488a651c08f84df8e4088303c94c58a728b",
      "Name": "Guardians of Blockchain (가.오.블)",
      "Ip": "15.165.194.81",
      "Website": "https://www.guardians-of-blockchain.com",
      "EffectiveStake": 26068868,
      "IsCertified": true,
      "OrbsAddress": "0838b80529ff7a785e1bd644c3bafc32f6d7811d",
      "NodeManagementURL": "http://15.165.194.81:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.803710666Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.194.81/vchains/1000005/status",
            "Management": "http://15.165.194.81:7666/vchains/1000005/management",
            "Logs": "http://15.165.194.81/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.194.81/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.801889352Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.194.81/vchains/1000006/status",
            "Management": "http://15.165.194.81:7666/vchains/1000006/management",
            "Logs": "http://15.165.194.81/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.194.81/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.532478638Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://15.165.194.81/services/boyar/status",
            "Logs": "http://15.165.194.81/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://15.165.194.81:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.626503761Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://15.165.194.81/services/signer/status",
            "Logs": "http://15.165.194.81/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.839Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://15.165.194.81/services/logs-service/status",
            "Logs": "http://15.165.194.81/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729595 (511 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:05.801Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://15.165.194.81/services/management-service/status",
            "Logs": "http://15.165.194.81/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.442002 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:51.963Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://15.165.194.81/services/ethereum-writer/status",
            "Logs": "http://15.165.194.81/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "0c56b39184e22249e35efcb9394872f0d025256b": {
      "EthAddress": "0c56b39184e22249e35efcb9394872f0d025256b",
      "Name": "AngelSong-of-Orbs",
      "Ip": "13.124.229.86",
      "Website": "https://blog.naver.com/jinan0119",
      "EffectiveStake": 45077585,
      "IsCertified": true,
      "OrbsAddress": "255c1f6c4da768dfd31f27057d38b84de41bcd4d",
      "NodeManagementURL": "http://13.124.229.86:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.959300179Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.124.229.86/vchains/1000005/status",
            "Management": "http://13.124.229.86:7666/vchains/1000005/management",
            "Logs": "http://13.124.229.86/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.124.229.86/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:40.183430469Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.124.229.86/vchains/1000006/status",
            "Management": "http://13.124.229.86:7666/vchains/1000006/management",
            "Logs": "http://13.124.229.86/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.124.229.86/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:56.196256906Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://13.124.229.86/services/boyar/status",
            "Logs": "http://13.124.229.86/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://13.124.229.86:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.988339954Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://13.124.229.86/services/signer/status",
            "Logs": "http://13.124.229.86/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:57.957Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://13.124.229.86/services/logs-service/status",
            "Logs": "http://13.124.229.86/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729580 (497 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.338Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://13.124.229.86/services/management-service/status",
            "Logs": "http://13.124.229.86/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.759618 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.619Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://13.124.229.86/services/ethereum-writer/status",
            "Logs": "http://13.124.229.86/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "17fe98a222c41217c51c823352537dc542ad06ef": {
      "EthAddress": "17fe98a222c41217c51c823352537dc542ad06ef",
      "Name": "FREEMAN",
      "Ip": "13.125.31.152",
      "Website": "https://blog.naver.com/freeman-k",
      "EffectiveStake": 14552048,
      "IsCertified": true,
      "OrbsAddress": "21ff8c5d4fce6912272dc424241811daec5fdbf3",
      "NodeManagementURL": "http://13.125.31.152:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.527929884Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.125.31.152/vchains/1000005/status",
            "Management": "http://13.125.31.152:7666/vchains/1000005/management",
            "Logs": "http://13.125.31.152/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.125.31.152/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:27.517657564Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://13.125.31.152/vchains/1000006/status",
            "Management": "http://13.125.31.152:7666/vchains/1000006/management",
            "Logs": "http://13.125.31.152/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://13.125.31.152/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.694005021Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://13.125.31.152/services/boyar/status",
            "Logs": "http://13.125.31.152/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://13.125.31.152:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:32.913808196Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://13.125.31.152/services/signer/status",
            "Logs": "http://13.125.31.152/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.896Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://13.125.31.152/services/logs-service/status",
            "Logs": "http://13.125.31.152/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (489 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.838Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://13.125.31.152/services/management-service/status",
            "Logs": "http://13.125.31.152/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.647295 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:52:57.985Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://13.125.31.152/services/ethereum-writer/status",
            "Logs": "http://13.125.31.152/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "f0db4646e4be8e2094cd6d7c6d253a87eec7af58": {
      "EthAddress": "f0db4646e4be8e2094cd6d7c6d253a87eec7af58",
      "Name": "Good relation-Guardian(굿가)",
      "Ip": "15.165.22.8",
      "Website": "https://blog.naver.com/emfla2272",
      "EffectiveStake": 44928316,
      "IsCertified": true,
      "OrbsAddress": "90e544fa6f0029e516ee433e736f1cbcdefc2630",
      "NodeManagementURL": "http://15.165.22.8:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:39.700960375Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.22.8/vchains/1000005/status",
            "Management": "http://15.165.22.8:7666/vchains/1000005/management",
            "Logs": "http://15.165.22.8/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.22.8/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:39.703902868Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://15.165.22.8/vchains/1000006/status",
            "Management": "http://15.165.22.8:7666/vchains/1000006/management",
            "Logs": "http://15.165.22.8/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://15.165.22.8/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.662459212Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://15.165.22.8/services/boyar/status",
            "Logs": "http://15.165.22.8/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://15.165.22.8:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.351941298Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://15.165.22.8/services/signer/status",
            "Logs": "http://15.165.22.8/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.632Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://15.165.22.8/services/logs-service/status",
            "Logs": "http://15.165.22.8/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729580 (503 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.646Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://15.165.22.8/services/management-service/status",
            "Logs": "http://15.165.22.8/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.497958 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:16.910Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://15.165.22.8/services/ethereum-writer/status",
            "Logs": "http://15.165.22.8/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "cca877408c68878ea02afd1c441cdaaa05d061f1": {
      "EthAddress": "cca877408c68878ea02afd1c441cdaaa05d061f1",
      "Name": "chainvalid8",
      "Ip": "54.219.18.44",
      "Website": "https://chainvalid8.com",
      "EffectiveStake": 3025922,
      "IsCertified": true,
      "OrbsAddress": "a0015ef8b6ea6dca2b55963d0b87ae1cdfd9771e",
      "NodeManagementURL": "http://54.219.18.44:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.624268857Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.219.18.44/vchains/1000005/status",
            "Management": "http://54.219.18.44:7666/vchains/1000005/management",
            "Logs": "http://54.219.18.44/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.219.18.44/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.41789038Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.219.18.44/vchains/1000006/status",
            "Management": "http://54.219.18.44:7666/vchains/1000006/management",
            "Logs": "http://54.219.18.44/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.219.18.44/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.809010337Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.219.18.44/services/boyar/status",
            "Logs": "http://54.219.18.44/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.219.18.44:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.163416729Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.219.18.44/services/signer/status",
            "Logs": "http://54.219.18.44/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.117Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.219.18.44/services/logs-service/status",
            "Logs": "http://54.219.18.44/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (509 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.480Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.219.18.44/services/management-service/status",
            "Logs": "http://54.219.18.44/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.901212 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.494Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.219.18.44/services/ethereum-writer/status",
            "Logs": "http://54.219.18.44/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "8ddb908c77ccc9cfde28ddf84311cb6fdf3f3125": {
      "EthAddress": "8ddb908c77ccc9cfde28ddf84311cb6fdf3f3125",
      "Name": "Jjang Orbs(짱)",
      "Ip": "52.78.29.172",
      "Website": "https://blog.naver.com/jjang-orbs",
      "EffectiveStake": 98242158,
      "IsCertified": true,
      "OrbsAddress": "cfb0a1637e9af76a544b3066a9ad24d935fcbe0e",
      "NodeManagementURL": "http://52.78.29.172:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:34.79784161Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.78.29.172/vchains/1000005/status",
            "Management": "http://52.78.29.172:7666/vchains/1000005/management",
            "Logs": "http://52.78.29.172/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.78.29.172/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.894025022Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.78.29.172/vchains/1000006/status",
            "Management": "http://52.78.29.172:7666/vchains/1000006/management",
            "Logs": "http://52.78.29.172/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.78.29.172/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.868646461Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://52.78.29.172/services/boyar/status",
            "Logs": "http://52.78.29.172/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://52.78.29.172:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:00.303298385Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://52.78.29.172/services/signer/status",
            "Logs": "http://52.78.29.172/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.712Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://52.78.29.172/services/logs-service/status",
            "Logs": "http://52.78.29.172/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729580 (506 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:45.699Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://52.78.29.172/services/management-service/status",
            "Logs": "http://52.78.29.172/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.412472 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.344Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://52.78.29.172/services/ethereum-writer/status",
            "Logs": "http://52.78.29.172/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "3d726623456e34e8a7f5567f6249ec4d72cc3595": {
      "EthAddress": "3d726623456e34e8a7f5567f6249ec4d72cc3595",
      "Name": "ORBS 1++흑우",
      "Ip": "3.34.237.131",
      "Website": "https://blog.naver.com/orbs_guardian",
      "EffectiveStake": 46953738,
      "IsCertified": true,
      "OrbsAddress": "28cc6746bf774ab7bab70f703fd857c86efc7835",
      "NodeManagementURL": "http://3.34.237.131:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:45.151504159Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.34.237.131/vchains/1000005/status",
            "Management": "http://3.34.237.131:7666/vchains/1000005/management",
            "Logs": "http://3.34.237.131/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.34.237.131/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:45.170853387Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.34.237.131/vchains/1000006/status",
            "Management": "http://3.34.237.131:7666/vchains/1000006/management",
            "Logs": "http://3.34.237.131/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.34.237.131/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.301466381Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://3.34.237.131/services/boyar/status",
            "Logs": "http://3.34.237.131/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://3.34.237.131:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:59.494910044Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://3.34.237.131/services/signer/status",
            "Logs": "http://3.34.237.131/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.271Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://3.34.237.131/services/logs-service/status",
            "Logs": "http://3.34.237.131/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729602 (492 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.156Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://3.34.237.131/services/management-service/status",
            "Logs": "http://3.34.237.131/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.595865 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:19.512Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://3.34.237.131/services/ethereum-writer/status",
            "Logs": "http://3.34.237.131/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "f058ccfb2324310c33e8fd9a1dda8e99c8beda59": {
      "EthAddress": "f058ccfb2324310c33e8fd9a1dda8e99c8beda59",
      "Name": "Bitgosu",
      "Ip": "54.180.3.15",
      "Website": "https://bitgosu.info",
      "EffectiveStake": 23233770,
      "IsCertified": true,
      "OrbsAddress": "400ab9c53447b47d92d07c5dea6bb3e472756e4d",
      "NodeManagementURL": "http://54.180.3.15:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.211940482Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.180.3.15/vchains/1000005/status",
            "Management": "http://54.180.3.15:7666/vchains/1000005/management",
            "Logs": "http://54.180.3.15/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.180.3.15/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.715006663Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.180.3.15/vchains/1000006/status",
            "Management": "http://54.180.3.15:7666/vchains/1000006/management",
            "Logs": "http://54.180.3.15/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.180.3.15/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:43.629138059Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.180.3.15/services/boyar/status",
            "Logs": "http://54.180.3.15/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.180.3.15:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:29.370208073Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.180.3.15/services/signer/status",
            "Logs": "http://54.180.3.15/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:49.600Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.180.3.15/services/logs-service/status",
            "Logs": "http://54.180.3.15/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (516 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:04.732Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.180.3.15/services/management-service/status",
            "Logs": "http://54.180.3.15/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.739044 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:17.531Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.180.3.15/services/ethereum-writer/status",
            "Logs": "http://54.180.3.15/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "69c57da3914693dbc5e96ff6c37216e70c6fbbc9": {
      "EthAddress": "69c57da3914693dbc5e96ff6c37216e70c6fbbc9",
      "Name": "Paradigm",
      "Ip": "130.193.51.109",
      "Website": "https://paradigmfund.io",
      "EffectiveStake": 1436460,
      "IsCertified": false,
      "OrbsAddress": "6412cb7c5aea5e5e822a45c51e2a9c0e4027366f",
      "NodeManagementURL": "http://130.193.51.109:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:55.770682507Z",
          "Version": "v2.0.13",
          "BlockHeight": 177316,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://130.193.51.109/vchains/1000005/status",
            "Management": "http://130.193.51.109:7666/vchains/1000005/management",
            "Logs": "http://130.193.51.109/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://130.193.51.109/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.967152314Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://130.193.51.109/vchains/1000006/status",
            "Management": "http://130.193.51.109:7666/vchains/1000006/management",
            "Logs": "http://130.193.51.109/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://130.193.51.109/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:42.990343146Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://130.193.51.109/services/boyar/status",
            "Logs": "http://130.193.51.109/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://130.193.51.109:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:51.751295673Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://130.193.51.109/services/signer/status",
            "Logs": "http://130.193.51.109/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:56.964Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://130.193.51.109/services/logs-service/status",
            "Logs": "http://130.193.51.109/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729657 (445 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.072Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://130.193.51.109/services/management-service/status",
            "Logs": "http://130.193.51.109/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.838694 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:23.990Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://130.193.51.109/services/ethereum-writer/status",
            "Logs": "http://130.193.51.109/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "c82ec0f3c834d337c51c9375a1c0a65ce7aadaec": {
      "EthAddress": "c82ec0f3c834d337c51c9375a1c0a65ce7aadaec",
      "Name": "ORBS-POS",
      "Ip": "84.201.173.154",
      "Website": "http://orbs-pos.info/",
      "EffectiveStake": 663473,
      "IsCertified": true,
      "OrbsAddress": "1ecaa5dd10d729b5e48ec40d36fd26e07419cc32",
      "NodeManagementURL": "http://84.201.173.154:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.812527739Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.173.154/vchains/1000005/status",
            "Management": "http://84.201.173.154:7666/vchains/1000005/management",
            "Logs": "http://84.201.173.154/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.173.154/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.982704406Z",
          "Version": "v2.0.13",
          "BlockHeight": 75372,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.173.154/vchains/1000006/status",
            "Management": "http://84.201.173.154:7666/vchains/1000006/management",
            "Logs": "http://84.201.173.154/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.173.154/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.247152751Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://84.201.173.154/services/boyar/status",
            "Logs": "http://84.201.173.154/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://84.201.173.154:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.682967588Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://84.201.173.154/services/signer/status",
            "Logs": "http://84.201.173.154/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.571Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://84.201.173.154/services/logs-service/status",
            "Logs": "http://84.201.173.154/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (504 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.219Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://84.201.173.154/services/management-service/status",
            "Logs": "http://84.201.173.154/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.744794 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:12.622Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://84.201.173.154/services/ethereum-writer/status",
            "Logs": "http://84.201.173.154/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "63aef7616882f488bca97361d1c24f05b4657ae5": {
      "EthAddress": "63aef7616882f488bca97361d1c24f05b4657ae5",
      "Name": "japan-guardian-altive-orbs-v2",
      "Ip": "54.168.36.177",
      "Website": "https://guardian-japan-orbs.com",
      "EffectiveStake": 102200896,
      "IsCertified": false,
      "OrbsAddress": "b5be5b3c47792cc97931dc8c16b9c18eed6a11ac",
      "NodeManagementURL": "http://54.168.36.177:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.489421401Z",
          "Version": "v2.0.13",
          "BlockHeight": 177314,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.168.36.177/vchains/1000005/status",
            "Management": "http://54.168.36.177:7666/vchains/1000005/management",
            "Logs": "http://54.168.36.177/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.168.36.177/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.474549935Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://54.168.36.177/vchains/1000006/status",
            "Management": "http://54.168.36.177:7666/vchains/1000006/management",
            "Logs": "http://54.168.36.177/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://54.168.36.177/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:28.765809935Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://54.168.36.177/services/boyar/status",
            "Logs": "http://54.168.36.177/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://54.168.36.177:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:46.92568038Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://54.168.36.177/services/signer/status",
            "Logs": "http://54.168.36.177/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.087Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://54.168.36.177/services/logs-service/status",
            "Logs": "http://54.168.36.177/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729583 (498 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.216Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://54.168.36.177/services/management-service/status",
            "Logs": "http://54.168.36.177/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 1.042741 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:20.117Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://54.168.36.177/services/ethereum-writer/status",
            "Logs": "http://54.168.36.177/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "5aefc9c2960635b2b1209d4330c84c15d9983ff5": {
      "EthAddress": "5aefc9c2960635b2b1209d4330c84c15d9983ff5",
      "Name": "Citadel.one",
      "Ip": "84.201.129.47",
      "Website": "https://citadel.one/",
      "EffectiveStake": 11781,
      "IsCertified": true,
      "OrbsAddress": "f1285a9cdcc2df8708ae780f7773be74ce1e13f1",
      "NodeManagementURL": "http://84.201.129.47:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:53.474025523Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.129.47/vchains/1000005/status",
            "Management": "http://84.201.129.47:7666/vchains/1000005/management",
            "Logs": "http://84.201.129.47/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.129.47/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.230232185Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://84.201.129.47/vchains/1000006/status",
            "Management": "http://84.201.129.47:7666/vchains/1000006/management",
            "Logs": "http://84.201.129.47/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://84.201.129.47/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:48.546120474Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://84.201.129.47/services/boyar/status",
            "Logs": "http://84.201.129.47/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://84.201.129.47:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.370114758Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://84.201.129.47/services/signer/status",
            "Logs": "http://84.201.129.47/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.976Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://84.201.129.47/services/logs-service/status",
            "Logs": "http://84.201.129.47/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (495 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:44.007Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://84.201.129.47/services/management-service/status",
            "Logs": "http://84.201.129.47/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.972707 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.116Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://84.201.129.47/services/ethereum-writer/status",
            "Logs": "http://84.201.129.47/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "9b3853cc5734f18ab95e99e6fa4e7fb5da1e1186": {
      "EthAddress": "9b3853cc5734f18ab95e99e6fa4e7fb5da1e1186",
      "Name": "MollBBang",
      "Ip": "3.35.184.213",
      "Website": "https://blog.naver.com/mollbbang",
      "EffectiveStake": 13344,
      "IsCertified": false,
      "OrbsAddress": "b226f469841d193829fa54661eac4ba5ce91a41e",
      "NodeManagementURL": "http://3.35.184.213:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.08605226Z",
          "Version": "v2.0.13",
          "BlockHeight": 177313,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.35.184.213/vchains/1000005/status",
            "Management": "http://3.35.184.213:7666/vchains/1000005/management",
            "Logs": "http://3.35.184.213/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.35.184.213/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:33.140704869Z",
          "Version": "v2.0.13",
          "BlockHeight": 75371,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://3.35.184.213/vchains/1000006/status",
            "Management": "http://3.35.184.213:7666/vchains/1000006/management",
            "Logs": "http://3.35.184.213/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://3.35.184.213/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:32.339149309Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://3.35.184.213/services/boyar/status",
            "Logs": "http://3.35.184.213/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://3.35.184.213:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.228059765Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://3.35.184.213/services/signer/status",
            "Logs": "http://3.35.184.213/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:47.592Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://3.35.184.213/services/logs-service/status",
            "Logs": "http://3.35.184.213/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729589 (489 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:38.485Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://3.35.184.213/services/management-service/status",
            "Logs": "http://3.35.184.213/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.960827 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:55.536Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://3.35.184.213/services/ethereum-writer/status",
            "Logs": "http://3.35.184.213/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "4aca0c63e351b2ea44ee628425710e933b5b3396": {
      "EthAddress": "4aca0c63e351b2ea44ee628425710e933b5b3396",
      "Name": "0xCORE",
      "Ip": "52.9.29.25",
      "Website": "https://github.com/orbs-network/orbs-network-go",
      "EffectiveStake": 1000,
      "IsCertified": false,
      "OrbsAddress": "65e6a0c648e8a3826e9b1b19c29e91f5b5c8296f",
      "NodeManagementURL": "http://52.9.29.25:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.426383062Z",
          "Version": "v2.0.13",
          "BlockHeight": 177315,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.9.29.25/vchains/1000005/status",
            "Management": "http://52.9.29.25:7666/vchains/1000005/management",
            "Logs": "http://52.9.29.25/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.9.29.25/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:54.44450414Z",
          "Version": "v2.0.13",
          "BlockHeight": 75373,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://52.9.29.25/vchains/1000006/status",
            "Management": "http://52.9.29.25:7666/vchains/1000006/management",
            "Logs": "http://52.9.29.25/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://52.9.29.25/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:30.776049983Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://52.9.29.25/services/boyar/status",
            "Logs": "http://52.9.29.25/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://52.9.29.25:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:52.77779716Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://52.9.29.25/services/signer/status",
            "Logs": "http://52.9.29.25/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.501Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://52.9.29.25/services/logs-service/status",
            "Logs": "http://52.9.29.25/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729583 (501 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:44.426Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://52.9.29.25/services/management-service/status",
            "Logs": "http://52.9.29.25/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.188595 ETH, TxFeesIn10Days = 0.000000 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:11.502Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://52.9.29.25/services/ethereum-writer/status",
            "Logs": "http://52.9.29.25/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    },
    "ca0ff0479bd7f52e55e65da7b76074b477b734b3": {
      "EthAddress": "ca0ff0479bd7f52e55e65da7b76074b477b734b3",
      "Name": "0xAUDIT",
      "Ip": "18.132.102.185",
      "Website": "https://github.com/orbs-network/orbs-network-go",
      "EffectiveStake": 0,
      "IsCertified": false,
      "OrbsAddress": "395f559948e43b45e632889c74b35ac742540e48",
      "NodeManagementURL": "http://18.132.102.185:7666/node/management",
      "NodeVirtualChains": {
        "1000005": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:37.632727277Z",
          "Version": "v2.0.13",
          "BlockHeight": 177312,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://18.132.102.185/vchains/1000005/status",
            "Management": "http://18.132.102.185:7666/vchains/1000005/management",
            "Logs": "http://18.132.102.185/vchains/1000005/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://18.132.102.185/vchains/1000005/metrics"
          }
        },
        "1000006": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:35.35964805Z",
          "Version": "v2.0.13",
          "BlockHeight": 75370,
          "BlockHeightToolTip": "",
          "ProtocolVersion": 2,
          "URLs": {
            "Status": "http://18.132.102.185/vchains/1000006/status",
            "Management": "http://18.132.102.185:7666/vchains/1000006/management",
            "Logs": "http://18.132.102.185/vchains/1000006/logs",
            "Version": "https://github.com/orbs-network/orbs-network-go/tree/v2.0.13",
            "Metrics": "http://18.132.102.185/vchains/1000006/metrics"
          }
        }
      },
      "NodeServices": {
        "Boyar": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:58.97859222Z",
          "Version": "v1.10.0",
          "URLs": {
            "Status": "http://18.132.102.185/services/boyar/status",
            "Logs": "http://18.132.102.185/services/boyar/logs",
            "Version": "https://github.com/orbs-network/boyarin/tree/v1.10.0",
            "Metrics": "http://18.132.102.185:9100/metrics"
          }
        },
        "Signer": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:41.373461777Z",
          "Version": "v2.3.0",
          "URLs": {
            "Status": "http://18.132.102.185/services/signer/status",
            "Logs": "http://18.132.102.185/services/signer/logs",
            "Version": "https://github.com/orbs-network/signer-service/tree/v2.3.0",
            "Metrics": ""
          }
        },
        "Logger": {
          "StatusMsg": "OK",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:54:50.714Z",
          "Version": "v1.1.3",
          "URLs": {
            "Status": "http://18.132.102.185/services/logs-service/status",
            "Logs": "http://18.132.102.185/services/logs-service/logs",
            "Version": "https://github.com/orbs-network/logs-service/tree/v1.1.3",
            "Metrics": ""
          }
        },
        "Management": {
          "StatusMsg": "RefTime = 1606729595 (507 sec ago), committee size = 22, stable node = v2.0.13",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:55:02.485Z",
          "Version": "v1.3.1",
          "URLs": {
            "Status": "http://18.132.102.185/services/management-service/status",
            "Logs": "http://18.132.102.185/services/management-service/logs",
            "Version": "https://github.com/orbs-network/management-service/tree/v1.3.1",
            "Metrics": ""
          }
        },
        "EthereumWriter": {
          "StatusMsg": "EthSyncStatus = operational, VcSyncStatus = in-sync, EtherBalance = 0.596576 ETH, TxFeesIn10Days = 0.001447 ETH",
          "Status": HealthLevel.Green,
          "StatusToolTip": "",
          "Timestamp": "2020-11-30T09:53:44.194Z",
          "Version": "v1.2.3",
          "URLs": {
            "Status": "http://18.132.102.185/services/ethereum-writer/status",
            "Logs": "http://18.132.102.185/services/ethereum-writer/logs",
            "Version": "https://github.com/orbs-network/ethereum-writer/tree/v1.2.3",
            "Metrics": ""
          }
        }
      },
      "NodeReputation": {
        "NodeVirtualChainReputations": {},
        "NodeVirtualChainBadReputations": {},
        "ReputationStatus": HealthLevel.Gray,
        "ReputationToolTip": ""
      }
    }
  },
}