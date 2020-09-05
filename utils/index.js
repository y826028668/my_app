// 封装原生api为promise方式
export const getSetting = () => {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
export const chooseAddress = () => {
	return new Promise((resolve, reject) => {
		uni.chooseAddress({
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}
export const openSetting = () => {
	return new Promise((resolve, reject) => {
		uni.openSetting({
			success: res => {
				resolve(res)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}