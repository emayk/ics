<?php

/*==========  Register Resource Approvaltype  ==========*/
Route::resource('approvaltype', 'Emayk\Ics\Repo\Approvaltype\ApprovaltypeController');

/*==========  Register Resource Buyers  ==========*/
Route::resource('buyers', 'Emayk\Ics\Repo\Buyers\BuyersController');

/*==========  Register Resource Contactperson  ==========*/
Route::resource('contactperson', 'Emayk\Ics\Repo\Contactperson\ContactpersonController');

/*==========  Register Resource Locations  ==========*/
/**
 * Locations
 */
Route::resource('locations', 'Emayk\Ics\Repo\Locations\LocationsController');

/*==========  Register Resource Offices  ==========*/
Route::resource('offices', 'Emayk\Ics\Repo\Offices\OfficesController');
/*==========  Register Resource Ordertype  ==========*/
Route::resource('ordertype', 'Emayk\Ics\Repo\Ordertype\OrdertypeController');
/*==========  Register Resource Orderstatus  ==========*/
Route::resource('orderstatus', 'Emayk\Ics\Repo\Orderstatus\OrderstatusController');
/*==========  Register Resource Paymenttype  ==========*/
Route::resource('paymenttype', 'Emayk\Ics\Repo\Paymenttype\PaymenttypeController');

/*==========  Register Resource Positions  ==========*/
Route::resource('positions', 'Emayk\Ics\Repo\Positions\PositionsController');
/*==========  Register Resource Productsuppliers  ==========*/
Route::resource('productsuppliers', 'Emayk\Ics\Repo\Productsuppliers\ProductsuppliersController');
/*==========  Register Resource Taxtype  ==========*/
Route::resource('taxtype', 'Emayk\Ics\Repo\Taxtype\TaxtypeController');
/*==========  Register Resource Typesuppliersbuyers  ==========*/
Route::resource('typesuppliersbuyers', 'Emayk\Ics\Repo\Typesuppliersbuyers\TypesuppliersbuyersController');
/*==========  Register Resource Unittypes  ==========*/
Route::resource('unittypes', 'Emayk\Ics\Repo\Unittypes\UnittypesController');
/*==========  Register Resource Users  ==========*/
Route::resource('users', 'Emayk\Ics\Repo\Users\UsersController');
/*==========  Register Resource Stockproducts  ==========*/
Route::resource('stockproducts', 'Emayk\Ics\Repo\Stockproducts\StockproductsController');
/*==========  Register Resource Stockproducthistory  ==========*/
Route::resource('stockproducthistory', 'Emayk\Ics\Repo\Stockproducthistory\StockproducthistoryController');
/*==========  Register Resource Stockproductwarehouse  ==========*/
Route::resource('stockproductwarehouse', 'Emayk\Ics\Repo\Stockproductwarehouse\StockproductwarehouseController');
/*==========  Register Resource Syschangelog  ==========*/
Route::resource('syschangelog', 'Emayk\Ics\Repo\Syschangelog\SyschangelogController');
/*==========  Register Resource Images  ==========*/
Route::resource('images', 'Emayk\Ics\Repo\Images\ImagesController');
/*==========  Register Resource Sysuseractionhistory  ==========*/
Route::resource('sysuseractionhistory', 'Emayk\Ics\Repo\Sysuseractionhistory\SysuseractionhistoryController');
/*==========  Register Resource Sysuserhistory  ==========*/
Route::resource('sysuserhistory', 'Emayk\Ics\Repo\Sysuserhistory\SysuserhistoryController');
/*==========  Register Resource Sysuserpermissions  ==========*/
Route::resource('sysuserpermissions', 'Emayk\Ics\Repo\Sysuserpermissions\SysuserpermissionsController');
/*==========  Register Resource Transorders  ==========*/
Route::resource('transorders', 'Emayk\Ics\Repo\Transorders\TransordersController');
/*==========  Register Resource Transorderapproval  ==========*/
Route::resource('transorderapproval', 'Emayk\Ics\Repo\Transorderapproval\TransorderapprovalController');
/*==========  Register Resource Transorderdetails  ==========*/
Route::resource('transorderdetails', 'Emayk\Ics\Repo\Transorderdetails\TransorderdetailsController');
/*==========  Register Resource Transorderhistory  ==========*/
Route::resource('transorderhistory', 'Emayk\Ics\Repo\Transorderhistory\TransorderhistoryController');
/*==========  Register Resource Transpaymentdpgeneral  ==========*/
Route::resource('transpaymentdpgeneral', 'Emayk\Ics\Repo\Transpaymentdpgeneral\TranspaymentdpgeneralController');
/*==========  Register Resource Transpaymentdpfabric  ==========*/
Route::resource('transpaymentdpfabric', 'Emayk\Ics\Repo\Transpaymentdpfabric\TranspaymentdpfabricController');
/*==========  Register Resource Statsproduct  ==========*/
Route::resource('statsproduct', 'Emayk\Ics\Repo\Statsproduct\StatsproductController');
/*==========  Register Resource Login  ==========*/
Route::resource('login', 'Emayk\Ics\Repo\Login\LoginController');
/*==========  Register Resource Saleproduct  ==========*/
/*==========  Register Resource Saleproduct  ==========*/
Route::resource('saleproduct', 'Emayk\Ics\Repo\Saleproduct\SaleproductController');
/*==========  Register Resource Transsale  ==========*/
Route::resource('transsale', 'Emayk\Ics\Repo\Transsale\TranssaleController');
/*==========  Register Resource Transreceiveproduct  ==========*/
Route::resource('receiveproduct', 'Emayk\Ics\Repo\Transreceiveproduct\TransreceiveproductController');
/*==========  Register Resource Transreceiveproductitem  ==========*/
Route::resource('receiveproductitem', 'Emayk\Ics\Repo\Transreceiveproductitem\TransreceiveproductitemController');
/*==========  Register Resource Sysprodhistory  ==========*/
Route::resource('sysprodhistory', 'Emayk\Ics\Repo\Sysprodhistory\SysprodhistoryController');
/*==========  Register Resource Purchaseorder  ==========*/
Route::resource('purchaseorder', 'Emayk\Ics\Repo\Purchaseorder\PurchaseorderController');
