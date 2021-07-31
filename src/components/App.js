import React, { Component } from 'react'
import Web3 from 'web3'
import HecoDidRegistry from '../abis/HecoDidRegistry.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
import EthrDID from "ethr-did";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      bscDidRegistry: {},
      did: 'No DID yet',
      jwt: '',
      ethrDid: undefined,
      loading: true
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load HecoDidRegistry
    const bscDidRegistryData = HecoDidRegistry.networks[networkId]
    if(bscDidRegistryData) {
      const bscDidRegistry = new web3.eth.Contract(HecoDidRegistry.abi, bscDidRegistryData.address)
      this.setState({ bscDidRegistry })
    } else {
      window.alert('HecoDidRegistry contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  signClaim = async (claim) =>  {
    this.setState({ loading: true })
    if(!this.state.ethrDid) window.alert('Please first create a DID')
    const jwt = await this.state.ethrDid.signJWT({ claims: claim });
    this.state.bscDidRegistry.methods.changeOwner(this.state.account, this.state.account).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false, jwt })
    })
  }

  createDid = () => {
    const keypair = EthrDID.createKeyPair();
    const ethrDid = new EthrDID({
      address: this.state.bscDidRegistry._address,
      privateKey: keypair.privateKey,
      provider: window.web3.currentProvider,
    });
    this.setState({ ethrDid: ethrDid, did: ethrDid.did.replace('ethr','hecor') })
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        did={this.state.did}
        jwt={this.state.jwt}
        createDid={this.createDid}
        signClaim={this.signClaim}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
