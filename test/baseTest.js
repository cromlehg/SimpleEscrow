
import ether from './helpers/ether'
import {advanceBlock} from './helpers/advanceToBlock'
import {increaseTimeTo, duration} from './helpers/increaseTime'
import latestTime from './helpers/latestTime'
import EVMThrow from './helpers/EVMThrow'

const BigNumber = web3.BigNumber

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should()

const Escrow = artifacts.require('SimpleEscrow')

contract('SimpleEscrow', function(wallets) {

  before(async function() {
    await advanceBlock()
  })
  
  beforeEach(async function () {
    this.escrow = await Escrow.new()
  })	 
  
  it('Integration test', async function () {
  
    const owner = wallets[0]

    const customer = wallets[1]
 
    const developer = wallets[2]

    const customerInvest = ether(3)

    const period = 12

    const safePeriod = 5

    console.log('Set new developer wallet')
    await this.escrow.setDeveloperWallet(developer, {from: owner}).should.be.fulfilled

    console.log('Rejects tests before invest')
    await this.escrow.orderNotAccepted({from: developer}).should.be.rejectedWith(EVMThrow)
    await this.escrow.completed({from: customer}).should.be.rejectedWith(EVMThrow)

    console.log('Invest 3 ether by customer')
    await this.escrow.sendTransaction({from: customer, value: customerInvest}).should.be.fulfilled
 
    const timeToComplete = await this.escrow.orderLastDate()

    console.log('Increase time to complete task time')
    await increaseTimeTo(timeToComplete)

    console.log('Task accepted by customer')
    await this.escrow.completed({from: customer}).should.be.fulfilled

  })

})
