//setting up keys and their values for development
module.exports = {
	
	'STATUS': {'INACTIVE': 0 , 'ACTIVE': 1, 'DE_ACTIVE': 2},
	'BOOKING_STATUS':{'STATUS_PENDING': 'pending' , 'STATUS_confirm':'confirm' , 'STATUS_CANCEL': 'cancel'},
	'DEFAULT_LANGUAGE': "en",
	'APP_LANGUAGE': ['en', 'hn'],
	'URL_EXPIRE_TIME': '2h',
	'USER_TYPE': {
		'ADMIN': 1,
		'USER': 2
	},
	'STATUS_CODE': {
		'SUCCESS': '1',
		'FAIL': '0',
		'VALIDATION': '2',
		'UNAUTHENTICATED': '-1',
		'NOT_FOUND': '-2'
	},
	'WEB_STATUS_CODE': {
		'OK': 200,
		'CREATED': 201,
		'NO_CONTENT': 204,
		'BAD_REQUEST': 400,
		'UNAUTHORIZED': 401,
		'NOT_FOUND': 404,
		'SERVER_ERROR': 500
	},
	'VERSION_STATUS': {
		'NO_UPDATE': 0,
		'OPTIONAL_UPDATE': 1,
		'FORCE_UPDATE': 2,
	},
}