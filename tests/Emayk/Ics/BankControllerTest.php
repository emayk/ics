<?php namespace Emayk\Ics;
class BankControllerTest extends IcsTestCase {

    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $this->client->request('GET', '/ics/api/bank');
        $this->assertTrue($this->client->getResponse()->isOk());
    }
    public function testShow()
    {
        $crawler = $this->client->request('GET', '/ics/api/bank/1');
        $this->assertTrue($this->client->getResponse()->isOk());
    }

    public function testBankEdit()
    {
        $crawler = $this->client->request('GET', '/ics/api/bank/1/edit');
        $this->assertTrue($this->client->getResponse()->isOk());
    }

}