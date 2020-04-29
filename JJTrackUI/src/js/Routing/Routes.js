const Routes = {
	root: ['/'],
	login: ['', 'login'],
	publicCalc: ['', 'public-calc'],
	calcs: ['', 'calcs'],
	dealCalcs: ['', 'deal-calcs', ':deal_id'],
	plans: ['', 'plans'],
	register: ['', 'register'],
	registerAsRef: ['', 'register-ref'],
	partners: ['', 'partners', 'filter', ':filter', 'created_at', ':date_start', ':date_end', 'active', ':active'],
	partner: ['', 'partner', ':partner_id'],
	partnerProfile: ['', 'partner-profile'],
	changePassword: ['', 'changepass'],
	referents: ['', 'referents', 'filter', ':filter', 'created_at', ':date_start', ':date_end', 'owners', ':owners', 'active', ':active'],
	referent: ['', 'referent', ':referent_id'],
	refProfile: ['', 'ref-profile'],
	addReferent: ['', 'add-ref'],
	products: ['', 'products'],
	addProduct: ['', 'add-product'],
	addDeal: ['', 'add-deal'],
	deals: [
		'', 'deals', 'filter', ':filter', 'created_at', ':date_start', ':date_end', 'status', ':status', 'deal_end', ':deal_start', ':deal_end',
		'credit', ':credit_start', ':credit_end', 'currency', ':currency', 'type', ':type', 'bank', ':bank', 'b_rev', ':min_b', ':max_b',
		'paid', ':paid_b', ':paid_p', ':paid_r', ':paid_c', 'interest', ':interest_min', ':interest_max', 'price', ':price_min', ':price_max',
		'no-cancel', ':no_cancel', 'partner', ':partner_id', 'ref', ':referent_id', 'contact', ':contact_id', 'network_builder', ':network_id',
		'tags', ':tags', 'cancel', ':reason',
	],
	deal: ['', 'deals', ':id'],
	bonuses: ['', 'bonuses'],
	addBonus: ['', 'add-bonus'],
	bonus: ['', 'bonus', ':bonus_id'],
	updateBonus: ['', 'update-bonus', ':bonus_id'],
	contacts: ['', 'contacts', 'bank', ':bank', 'town', ':town', 'name', ':name'],
	addContact: ['', 'add-contact'],
	reports: ['','reports'],
	monitoring: ['','monitoring'],
	birthdays: ['', 'birthdays'],
	resolutions: ['', 'resolutions'],
	addOwnerFile: ['', 'add-owner-file'],
	ownerFiles: ['', 'owner-files', 'filter', ':filter', 'for-pratner', ':for_partner', 'for-ref', ':for_ref', 'product', ':product', 'bank', ':bank'],
	updateOwnerFile: ['', 'update-owner-file', ':id'],
	dashboard: ['', 'dashboard'],
	bankProperties: ['', 'bank-properties'],
	calcSettings: ['', 'calc-settings'],
	calcSettingsConsumer: ['', 'calc-settings-consumer'],
	sendEmail: ['', 'send-email'],
	development: ['', 'development']
};

function fullRoute (params = {}) {
	return this.map(seg => (seg[0] === ':' && params[seg.substring(1)]) ? params[seg.substring(1)] : seg).join('/');
}
for (let key of Object.keys(Routes)) {
	Routes[key].full = fullRoute.bind(Routes[key]);
}

export { Routes };