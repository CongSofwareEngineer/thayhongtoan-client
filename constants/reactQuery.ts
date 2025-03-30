export enum QUERY_KEY {
	GetAllProduct = 'GetAllProduct',
	GetListProductAdmin = 'GetListProductAdmin',
	GetCategoryAdmin = 'GetCategoryAdmin',
	GetSubCategoryAdmin = 'GetSubCategoryAdmin',
	GetProductShop = 'GetProductShop',
	GetAllNests = 'GetAllNests',
	GetCommentProduction = 'GetCommentProduction',
	GetCommentDetail = 'GetCommentDetail',
	LengthCartUser = 'LengthCartUser',
	VouchersDaily = 'VouchersDaily',
	GetProductByID = 'GetProductByID',
	MyCartUser = 'MyCartUser',
	MyBillUser = 'MyBillUser',
	AllProvincesVn = 'AllProvincesVn',
	VoucherByIdUser = 'VoucherByIdUser',
	BillAdmin = 'BillAdmin',
	VoucherAdmin = 'VoucherAdmin',
	GetCommentAdmin = 'GetCommentAdmin',
	RevenueAdmin = 'RevenueAdmin',
	GetNests = 'GetNests',
	GetShoesShop = 'GetShoesShop',
	GetMoreCollections = 'GetMoreCollections',
	GetFanPage = 'GetFanPage',
	GetUserAdmin = 'GetUserAdmin',
	GetUserDetailById = 'GetUserDetailById',
}

export type TypeHookReactQuery = {
	data: any[];
	page: number;
};
