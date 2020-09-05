let ajaxTime = 0
export default function (params) {
	ajaxTime++
	wx.showLoading({
		title:"加载中",
		mask: true
	})
	if(!params.url) return
	const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/'
	return new Promise((resolve, reject) => {
		uni.request({
			method: params.mode ? "POST" : "GET",
			...params,
			url: baseUrl + params.url,
			success: res => {
				resolve(res.data)
			},
			fail: err => {
				reject(err)
			},
			complete: () => {
				ajaxTime--
				if(ajaxTime === 0) {
					wx.hideLoading()
				}
			}
		})
	})
}