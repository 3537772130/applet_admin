<script type='text/javascript'>

  /**
   * 判断登录是否失效
   * @param that
   * @returns {boolean}
   */
  let checkLogin = function (that) {
    let userInfo = that.$cookies.get('user_info')
    if (userInfo === 'null' || userInfo === null) {
      return false
    }
    return true
  }

  /**
   * 登录过期处理
   * @param that
   * @param loading
   */
  let exitLoad = function (that, loading, data) {
    if (loading === null) {
      that.loading = false
    } else {
      that.$nextTick(() => {
        loading.close()
      })
    }
    if (data === '') {
      that.$message.error('当前访问人数过多，请稍后再试')
    } else if (data.code === '0' || data.code === '-2') {
      let msg = data.code === '0' ? '登录过期，请重新登录':'没有访问权限！'
      that.$message({
        message: msg,
        type: 'error',
        onClose: function () {
          that.$cookies.remove('manager_info')
          that.$router.push({path: '/'})
        }
      })
    } else {
      let managerInfo = that.$cookies.get('manager_info')
      that.$cookies.set('manager_info', managerInfo, 3600)
    }
  }

  /**
   * 表单验证
   */
  let validate = function (that) {
    return {
      /**
       * 校验账号
       */
      userNameValidator: (rule, value, callback) => {
        that.$axios({
          url: '/api/manage/checkUserNameRegistered',
          method: 'post',
          data: {userName: value}
        }).then(res => {
          // console.info('后台返回的数据', res.data)
          if (res.data.code != '1') {
            callback(new Error(res.data.data))
          } else {
            callback()
          }
        }).catch(error => {
          console.info('错误信息', error)
          callback(new Error('该账户已被注册'))
        })
      },
      /**
       * 校验手机号码格式
       */
      mobileValidator: (rule, value, callback) => {
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[013678])|(18[0,3,5-9]))\d{8}$/
        if (value && !reg.test(value)) {
          callback(new Error('手机号码格式不正确!'))
        } else {
          callback()
        }
      },
      /**
       * 校验手机号码格式
       */
      emailValidator: (rule, value, callback) => {
        let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        if (value && !reg.test(value)) {
          callback(new Error('邮箱格式不正确!'))
        } else {
          callback()
        }
      },
      /**
       * 管理员密码校验
       **/
      managerPasswordValidator: (rule, value, callback) => {
        let managerId = that.getManagerId()
        if (managerId && managerId != '') {
          try {
            if (value.length < 1) {
              callback()
            } else if (value.length >= 6 && value.length <= 20) {
              callback()
            } else if (value.length > 20 || (value.length < 6 && value.length > 0)) {
              callback(new Error('密码长度为6-20个字符'))
            } else {
              callback(new Error('请输入密码'))
            }
          } catch (e) {
            callback()
          }
        } else if (value.length >= 6 && value.length <= 20) {
          callback()
        } else if (value.length > 20 || (value.length < 6 && value.length > 0)) {
          callback(new Error('密码长度为6-20个字符'))
        } else {
          callback(new Error('请输入密码'))
        }
      },
      /**
       * 管理员确认密码校验
       */
      managerConfirmPasswordValidator: (rule, value, callback) => {
        let managerId = that.getManagerId()
        let password = that.getPassword()
        if (managerId && managerId != '') {
          try {
            if (password.length > 0) {
              try {
                if (value.length < 1) {
                  callback()
                } else if (value.length >= 6 && value.length <= 20) {
                  callback()
                } else if (value.length > 20 || (value.length < 6 && value.length > 0)) {
                  callback(new Error('确认密码长度为6-20个字符'))
                } else {
                  callback(new Error('请输入确认密码'))
                }
              } catch (e) {
                callback(new Error('请输入确认密码'))
              }
            } else {
              callback()
            }
          } catch (e) {
            callback()
          }
        } else if (value.length >= 6 && value.length <= 20) {
          if (value === password) {
            callback()
          } else {
            callback(new Error('两次输入密码不一致'))
          }
        } else if (value.length > 20 || (value.length < 6 && value.length > 0)) {
          callback(new Error('确认密码长度为6-20个字符'))
        } else {
          callback(new Error('请输入确认密码'))
        }
      },
    }
  }

  /**
   * 动态设置查询页表单高度
   **/
  let setTableHeight = function (that, formId) {
    let tabPaneHeight = that.$cookies.get('tabPaneHeight')
    let height = document.getElementById(formId).offsetHeight
    that.tableHeight = tabPaneHeight - height - 70
  }


  /**
   * 查询地域信息 json
   * @param that
   */
  let selectRegionJson = function (that) {
    that.regions = []
    that.$axios({
      url: '/api/selectRegionJson',
      method: 'post'
    }).then(res => {
      that.regions = JSON.parse(res.data.data)
      that.loading = false
    }).catch(error => {
      console.info('错误信息', error)
      return null
    })
  }

  /**
   * 查询地域信息 list
   * @param that
   * @param id
   * @param level
   */
  let selectRegionList = function (that, id, level) {
    that.$axios({
      url: '/api/selectRegionList',
      method: 'post',
      data: {id: id}
    }).then(res => {
      // console.info('后台返回的数据', res.data)
      if (level === '1') {
        that.provList = res.data.data
      } else if (level === '2') {
        that.cityList = res.data.data
      } else {
        that.countyList = res.data.data
        that.loading = false
      }
    }).catch(error => {
      console.info('错误信息', error)
      return null
    })
  }

  let baseToGet = function (obj) {
    let str = JSON.stringify(obj)
    let dataStr = ''
    for (let i = 0;i < str.length;i++){
      switch (str[i]) {
        case '{':
          dataStr += ''
          break
        case '}':
          dataStr += ''
          break
        case '\"':
          dataStr += ''
          break
        case ':':
          dataStr += '='
          break
        case ',':
          dataStr += '&'
          break
        default:
          dataStr += str[i]
          break
      }
    }
    return dataStr
  }

  export default {
    checkLogin,
    exitLoad,
    validate,
    setTableHeight,
    selectRegionJson,
    selectRegionList,
    baseToGet
  }
</script>
