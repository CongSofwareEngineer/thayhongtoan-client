import { CollectionReference, DocumentData, DocumentReference, Query, WhereFilterOp } from 'firebase/firestore/lite';
import { FILTER_BILL } from './app';

export const DATA_BASE = {
	About: 'About',
} as const;

export const FB_FC = {
	getAllData: 'getAllData',
	getDataByLimit: 'getDataByLimit',
	getProductShop: 'getProductShop',
	getMyCart: 'getMyCart',
	getAllDataOption2: 'getAllDataOption2',
	queryData: 'queryData',
	queryDataOption2: 'queryDataOption2',
	queryListData: 'queryListData',
	getDataByID: 'getDataByID',
	addData: 'addData',
	updateData: 'updateData',
	deleteData: 'deleteData',
	upLoadImg: 'upLoadImg',
} as const;

export type DatabaseQueryType = Query<unknown, DocumentData>;
export type DatabaseCollectionType = CollectionReference<DocumentData, DocumentData>;
export type DatabaseDocsType = DocumentReference<DocumentData, DocumentData>;
export type DatabaseType = any;

export type QueryData = { key: string; match: WhereFilterOp; value: any };

// type data body to work fire store
export type BodyAddCart = {
	amount: number;
	date?: number;
	idProduct?: string | undefined;
	idUser?: string | undefined;
	keyNameProduct?: string;
	moreConfig?: { [key: string]: any };
};

export type BodyAddBill = {
	idUser?: string | undefined;
	listBill: { _id: string; keyName?: string; amount: number; idCart?: string; [key: string]: any }[];
	addressShip: any;
	discount: number;
	sdt: string;
	name: string;
	status: FILTER_BILL;
	abort?: boolean;
	totalBill: number;
	listNewSoldProduct?: { [key: string]: any }[];
	expUser?: number;
	infoBanking?: {
		id?: string;
		messages?: string;
	};
};

export type BodyUserData = {
	date?: number;
	sdt?: string;
	isAdmin?: boolean;
	exp?: 0;
	address?: string;
	name?: string;
	avatar?: string | null;
	pass?: string;
	addressShipper: string[];
	sex: boolean;
};

export const TYPE_NOTIFICATION = {
	myCart: 'myCart',
	myBill: 'myBill',
	shoesShop: 'shoesShop',
};
