<?php
use Emayk\Ics\Repo;
/**
*
* File ini Hanya mendaptarkan semua interface yang digunakan di applikasi ICS
*
* Tujuan :
* Hanya Untuk Lebih Rapi
*
**/

App::bindIf('Emayk\Ics\Repo\Bank\BankInterface',function(){
	return new Repo\Bank\BankEloquent(new Repo\Bank\Bank() );
});

App::bindIf('Emayk\Ics\Repo\Dept\DeptInterface',function(){
	return new Repo\Dept\DeptEloquent(new Repo\Dept\Dept() );
});

App::bindIf('Emayk\Ics\Repo\Legality\LegalityInterface',function(){
	return new Repo\Legality\LegalityEloquent(
        new Repo\Legality\Legality()
    );
});



/*==========  Register Interface Colors  ==========*/

App::bindIf('Emayk\Ics\Repo\Colors\ColorsInterface',function(){
	return new Repo\Colors\ColorsEloquent(new Repo\Colors\Colors() );
});

/*==========  Register Interface Currencies  ==========*/

App::bindIf('Emayk\Ics\Repo\Currencies\CurrenciesInterface',function(){
	return new Repo\Currencies\CurrenciesEloquent(new Repo\Currencies\Currencies() );
});


/*==========  Register Interface Fabricgrade  ==========*/

App::bindIf('Emayk\Ics\Repo\Fabricgrade\FabricgradeInterface',function(){
	return new Repo\Fabricgrade\FabricgradeEloquent(new Repo\Fabricgrade\Fabricgrade() );
});


/*==========  Register Interface Countries  ==========*/

App::bindIf('Emayk\Ics\Repo\Countries\CountriesInterface',function(){
	return new Repo\Countries\CountriesEloquent(new Repo\Countries\Countries() );
});


/*==========  Register Interface Warehouse  ==========*/

App::bindIf('Emayk\Ics\Repo\Warehouse\WarehouseInterface',function(){
	return new Repo\Warehouse\WarehouseEloquent(new Repo\Warehouse\Warehouse() );
});


/*==========  Register Interface Warehousecategory  ==========*/

App::bindIf('Emayk\Ics\Repo\Warehousecategory\WarehousecategoryInterface',function(){
	return new Repo\Warehousecategory\WarehousecategoryEloquent(new Repo\Warehousecategory\Warehousecategory() );
});


/*==========  Register Interface Products  ==========*/

App::bindIf('Emayk\Ics\Repo\Products\ProductsInterface',function(){
	return new Repo\Products\ProductsEloquent(new Repo\Products\Products() );
});


/*==========  Register Interface Units  ==========*/

App::bindIf('Emayk\Ics\Repo\Units\UnitsInterface',function(){
	return new Repo\Units\UnitsEloquent(new Repo\Units\Units() );
});

/*==========  Register Interface Suppliers  ==========*/

App::bindIf('Emayk\Ics\Repo\Suppliers\SuppliersInterface',function(){
	return new Repo\Suppliers\SuppliersEloquent(new Repo\Suppliers\Suppliers() );
});


/*==========  Register Interface Productdetails  ==========*/

App::bindIf('Emayk\Ics\Repo\Productdetails\ProductdetailsInterface',function(){
	return new Repo\Productdetails\ProductdetailsEloquent(new Repo\Productdetails\Productdetails() );
});


/*==========  Register Interface Producttype  ==========*/

App::bindIf('Emayk\Ics\Repo\Producttype\ProducttypeInterface',function(){
	return new Repo\Producttype\ProducttypeEloquent(new Repo\Producttype\Producttype() );
});


/*==========  Register Interface Settingprogram  ==========*/

App::bindIf('Emayk\Ics\Repo\Settingprogram\SettingprogramInterface',function(){
	return new Repo\Settingprogram\SettingprogramEloquent(new Repo\Settingprogram\Settingprogram() );
});


/*==========  Register Interface Settingcompany  ==========*/

App::bindIf('Emayk\Ics\Repo\Settingcompany\SettingcompanyInterface',function(){
	return new Repo\Settingcompany\SettingcompanyEloquent(new Repo\Settingcompany\Settingcompany() );
});


/*==========  Register Interface Status  ==========*/

App::bindIf('Emayk\Ics\Repo\Status\StatusInterface',function(){
	return new Repo\Status\StatusEloquent(new Repo\Status\Status() );
});


/*==========  Register Interface Bankaccount  ==========*/

App::bindIf('Emayk\Ics\Repo\Bankaccount\BankaccountInterface',function(){
	return new Repo\Bankaccount\BankaccountEloquent(new Repo\Bankaccount\Bankaccount() );
});


/*==========  Register Interface Approvaltype  ==========*/

App::bindIf('Emayk\Ics\Repo\Approvaltype\ApprovaltypeInterface',function(){
	return new Repo\Approvaltype\ApprovaltypeEloquent(new Repo\Approvaltype\Approvaltype() );
});


/*==========  Register Interface Bankaccounttype  ==========*/

App::bindIf('Emayk\Ics\Repo\Bankaccounttype\BankaccounttypeInterface',function(){
	return new Repo\Bankaccounttype\BankaccounttypeEloquent(new Repo\Bankaccounttype\Bankaccounttype() );
});


/*==========  Register Interface Buyers  ==========*/

App::bindIf('Emayk\Ics\Repo\Buyers\BuyersInterface',function(){
	return new Repo\Buyers\BuyersEloquent(new Repo\Buyers\Buyers() );
});


/*==========  Register Interface Productcategory  ==========*/

App::bindIf('Emayk\Ics\Repo\Productcategory\ProductcategoryInterface',function(){
	return new Repo\Productcategory\ProductcategoryEloquent(new Repo\Productcategory\Productcategory() );
});


/*==========  Register Interface Contactperson  ==========*/

App::bindIf('Emayk\Ics\Repo\Contactperson\ContactpersonInterface',function(){
	return new Repo\Contactperson\ContactpersonEloquent(new Repo\Contactperson\Contactperson() );
});


/*==========  Register Interface Fabrictype  ==========*/

App::bindIf('Emayk\Ics\Repo\Fabrictype\FabrictypeInterface',function(){
	return new Repo\Fabrictype\FabrictypeEloquent(new Repo\Fabrictype\Fabrictype() );
});


/*==========  Register Interface Locations  ==========*/

App::bindIf('Emayk\Ics\Repo\Locations\LocationsInterface',function(){
	return new Repo\Locations\LocationsEloquent(new Repo\Locations\Locations() );
});



/*==========  Register Interface Warehouseofficer  ==========*/

App::bindIf('Emayk\Ics\Repo\Warehouseofficer\WarehouseofficerInterface',function(){
	return new Repo\Warehouseofficer\WarehouseofficerEloquent(new Repo\Warehouseofficer\Warehouseofficer() );
});


/*==========  Register Interface Offices  ==========*/

App::bindIf('Emayk\Ics\Repo\Offices\OfficesInterface',function(){
	return new Repo\Offices\OfficesEloquent(new Repo\Offices\Offices() );
});


/*==========  Register Interface Ordertype  ==========*/

App::bindIf('Emayk\Ics\Repo\Ordertype\OrdertypeInterface',function(){
	return new Repo\Ordertype\OrdertypeEloquent(new Repo\Ordertype\Ordertype() );
});


/*==========  Register Interface Orderstatus  ==========*/

App::bindIf('Emayk\Ics\Repo\Orderstatus\OrderstatusInterface',function(){
	return new Repo\Orderstatus\OrderstatusEloquent(new Repo\Orderstatus\Orderstatus() );
});


/*==========  Register Interface Paymenttype  ==========*/

App::bindIf('Emayk\Ics\Repo\Paymenttype\PaymenttypeInterface',function(){
	return new Repo\Paymenttype\PaymenttypeEloquent(new Repo\Paymenttype\Paymenttype() );
});


/*==========  Register Interface Phones  ==========*/

App::bindIf('Emayk\Ics\Repo\Phones\PhonesInterface',function(){
	return new Repo\Phones\PhonesEloquent(new Repo\Phones\Phones() );
});


/*==========  Register Interface Positions  ==========*/

App::bindIf('Emayk\Ics\Repo\Positions\PositionsInterface',function(){
	return new Repo\Positions\PositionsEloquent(new Repo\Positions\Positions() );
});


/*==========  Register Interface Productsuppliers  ==========*/

App::bindIf('Emayk\Ics\Repo\Productsuppliers\ProductsuppliersInterface',function(){
	return new Repo\Productsuppliers\ProductsuppliersEloquent(new Repo\Productsuppliers\Productsuppliers() );
});


/*==========  Register Interface Taxtype  ==========*/

App::bindIf('Emayk\Ics\Repo\Taxtype\TaxtypeInterface',function(){
	return new Repo\Taxtype\TaxtypeEloquent(new Repo\Taxtype\Taxtype() );
});


/*==========  Register Interface Typesuppliersbuyers  ==========*/

App::bindIf('Emayk\Ics\Repo\Typesuppliersbuyers\TypesuppliersbuyersInterface',function(){
	return new Repo\Typesuppliersbuyers\TypesuppliersbuyersEloquent(new Repo\Typesuppliersbuyers\Typesuppliersbuyers() );
});


/*==========  Register Interface Unittypes  ==========*/

App::bindIf('Emayk\Ics\Repo\Unittypes\UnittypesInterface',function(){
	return new Repo\Unittypes\UnittypesEloquent(new Repo\Unittypes\Unittypes() );
});


/*==========  Register Interface Users  ==========*/

App::bindIf('Emayk\Ics\Repo\Users\UsersInterface',function(){
	return new Repo\Users\UsersEloquent(new Repo\Users\Users() );
});


/*==========  Register Interface Stockproducts  ==========*/

App::bindIf('Emayk\Ics\Repo\Stockproducts\StockproductsInterface',function(){
	return new Repo\Stockproducts\StockproductsEloquent(new Repo\Stockproducts\Stockproducts() );
});


/*==========  Register Interface Stockproducthistory  ==========*/

App::bindIf('Emayk\Ics\Repo\Stockproducthistory\StockproducthistoryInterface',function(){
	return new Repo\Stockproducthistory\StockproducthistoryEloquent(new Repo\Stockproducthistory\Stockproducthistory() );
});


/*==========  Register Interface Stockproductwarehouse  ==========*/

App::bindIf('Emayk\Ics\Repo\Stockproductwarehouse\StockproductwarehouseInterface',function(){
	return new Repo\Stockproductwarehouse\StockproductwarehouseEloquent(new Repo\Stockproductwarehouse\Stockproductwarehouse() );
});


/*==========  Register Interface Syschangelog  ==========*/

App::bindIf('Emayk\Ics\Repo\Syschangelog\SyschangelogInterface',function(){
	return new Repo\Syschangelog\SyschangelogEloquent(new Repo\Syschangelog\Syschangelog() );
});


/*==========  Register Interface Images  ==========*/

App::bindIf('Emayk\Ics\Repo\Images\ImagesInterface',function(){
	return new Repo\Images\ImagesEloquent(new Repo\Images\Images() );
});


/*==========  Register Interface Sysuseractionhistory  ==========*/

App::bindIf('Emayk\Ics\Repo\Sysuseractionhistory\SysuseractionhistoryInterface',function(){
	return new Repo\Sysuseractionhistory\SysuseractionhistoryEloquent(new Repo\Sysuseractionhistory\Sysuseractionhistory() );
});


/*==========  Register Interface Sysuserhistory  ==========*/

App::bindIf('Emayk\Ics\Repo\Sysuserhistory\SysuserhistoryInterface',function(){
	return new Repo\Sysuserhistory\SysuserhistoryEloquent(new Repo\Sysuserhistory\Sysuserhistory() );
});


/*==========  Register Interface Sysuserpermissions  ==========*/

App::bindIf('Emayk\Ics\Repo\Sysuserpermissions\SysuserpermissionsInterface',function(){
	return new Repo\Sysuserpermissions\SysuserpermissionsEloquent(new Repo\Sysuserpermissions\Sysuserpermissions() );
});


/*==========  Register Interface Transorders  ==========*/

App::bindIf('Emayk\Ics\Repo\Transorders\TransordersInterface',function(){
	return new Repo\Transorders\TransordersEloquent(new Repo\Transorders\Transorders() );
});


/*==========  Register Interface Transorderapproval  ==========*/

App::bindIf('Emayk\Ics\Repo\Transorderapproval\TransorderapprovalInterface',function(){
	return new Repo\Transorderapproval\TransorderapprovalEloquent(new Repo\Transorderapproval\Transorderapproval() );
});


/*==========  Register Interface Transorderdetails  ==========*/

App::bindIf('Emayk\Ics\Repo\Transorderdetails\TransorderdetailsInterface',function(){
	return new Repo\Transorderdetails\TransorderdetailsEloquent(new Repo\Transorderdetails\Transorderdetails() );
});


/*==========  Register Interface Transorderhistory  ==========*/

App::bindIf('Emayk\Ics\Repo\Transorderhistory\TransorderhistoryInterface',function(){
	return new Repo\Transorderhistory\TransorderhistoryEloquent(new Repo\Transorderhistory\Transorderhistory() );
});



/*==========  Register Interface Transpaymentdpgeneral  ==========*/

App::bindIf('Emayk\Ics\Repo\Transpaymentdpgeneral\TranspaymentdpgeneralInterface',function(){
	return new Repo\Transpaymentdpgeneral\TranspaymentdpgeneralEloquent(new Repo\Transpaymentdpgeneral\Transpaymentdpgeneral() );
});


/*==========  Register Interface Transpaymentdpfabric  ==========*/

App::bindIf('Emayk\Ics\Repo\Transpaymentdpfabric\TranspaymentdpfabricInterface',function(){
	return new Repo\Transpaymentdpfabric\TranspaymentdpfabricEloquent(new Repo\Transpaymentdpfabric\Transpaymentdpfabric() );
});


/*==========  Register Interface Statsproduct  ==========*/

App::bindIf('Emayk\Ics\Repo\Statsproduct\StatsproductInterface',function(){
	return new Repo\Statsproduct\StatsproductEloquent(new Repo\Statsproduct\Statsproduct() );
});


/*==========  Register Interface Login  ==========*/

App::bindIf('Emayk\Ics\Repo\Login\LoginInterface',function(){
	return new Repo\Login\LoginEloquent(new Repo\Login\Login() );
});


/*==========  Register Interface Saleproduct  ==========*/

App::bindIf('Emayk\Ics\Repo\Saleproduct\SaleproductInterface',function(){
	return new Repo\Saleproduct\SaleproductEloquent(new Repo\Saleproduct\Saleproduct() );
});


/*==========  Register Interface Transsale  ==========*/

App::bindIf('Emayk\Ics\Repo\Transsale\TranssaleInterface',function(){
	return new Repo\Transsale\TranssaleEloquent(new Repo\Transsale\Transsale() );
});


/*==========  Register Interface Transreceiveproduct  ==========*/

App::bindIf('Emayk\Ics\Repo\Transreceiveproduct\TransreceiveproductInterface',function(){
	return new Repo\Transreceiveproduct\TransreceiveproductEloquent(new Repo\Transreceiveproduct\Transreceiveproduct() );
});


/*==========  Register Interface Transreceiveproductitem  ==========*/

App::bindIf('Emayk\Ics\Repo\Transreceiveproductitem\TransreceiveproductitemInterface',function(){
	return new Repo\Transreceiveproductitem\TransreceiveproductitemEloquent(new Repo\Transreceiveproductitem\Transreceiveproductitem() );
});

