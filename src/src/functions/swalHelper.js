import SwAlert from 'sweetalert2';

class SwalHelper {
  constructor() {
    if (!SwalHelper.instance) {
      SwalHelper.instance = this;
    }
    return SwalHelper.instance;
  }

  // eslint-disable-next-line class-methods-use-this
  async confirm(title, html) {
    // eslint-disable-next-line no-return-await
    return await SwAlert.fire({
      title,
      html,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-cancel',
      },
      icon: 'info',
      showCancelButton: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async warning(title, html) {
    await SwAlert.fire({
      title,
      html,
      icon: 'warning',
      showCancelButton: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async warningConfirm(title, html) {
    // eslint-disable-next-line no-return-await
    return await SwAlert.fire({
      title,
      html,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      icon: 'warning',
      showCancelButton: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async successConfirm(title, html) {
    // eslint-disable-next-line no-return-await
    return await SwAlert.fire({
      title,
      html,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
      icon: 'success',
      showCancelButton: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async error(title, html) {
    await SwAlert.fire({
      title,
      html,
      icon: 'error',
      showCancelButton: false,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async httpResponseAlert(response, actionTitle, options = {
    successMessage: '',
    ongoingMessage: '',
    isRetryMessage: '',
    unAuthMessage: '',
    forbiddenMessage: '',
    notFoundMessage: '',
    notAllowMessage: '',
    hasConflictMessage: '',
    hasErrorMessage: '',
    hasServerErrorMessage: '',
  }) {
    /* HttpHelper 로 만든 response 는 아래 항목의 boolean 을 추가적으로 가짐 by Raol
      success(200)
      ongoing(202)
      isRetry(410)
      unAuth(401)
      forbidden(403)
      notFound(404)
      notAllow(405)
      hasConflict(409)
      hasError( >= 400)
      hasServerError( >= 500)
     */
    if (response.success) {
      await SwAlert.fire({
        title: options.successMessage || `${actionTitle} 되었습니다.`,
        icon: 'success',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.creating) {
      await SwAlert.fire({
        title: options.successMessage || `${actionTitle} 되었습니다.`,
        icon: 'success',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.ongoing) {
      await SwAlert.fire({
        title: options.ongoingMessage || `${actionTitle}을/를 수행중입니다.`,
        icon: 'success',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.isRetry) {
      await SwAlert.fire({
        title: options.isRetryMessage || `${actionTitle}을/를 다시 수행해주세요.`,
        icon: 'warning',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.unAuth) {
      await SwAlert.fire({
        title: options.unAuthMessage || `${actionTitle}을/를 수행하는데 인증이 필요합니다.`,
        icon: 'warning',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.forbidden) {
      await SwAlert.fire({
        title: options.forbiddenMessage || `${actionTitle}을/를 수행할 권한이 없습니다.`,
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.notFound) {
      await SwAlert.fire({
        title: options.notFoundMessage || `${actionTitle}을/를 수행할 수 없습니다.`,
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.notAllow) {
      await SwAlert.fire({
        title: options.notAllowMessage || `${actionTitle}을/를 위한 데이터를 다시 확인해주세요.`,
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.hasConflict) {
      await SwAlert.fire({
        title: options.hasConflictMessage || `${actionTitle}을/를 위한 데이터와 중복된 값이 있습니다. 데이터를 다시 확인해주세요.`,
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else if (response.hasServerError) {
      await SwAlert.fire({
        title: options.hasServerErrorMessage || 'Alltem 서버에 에러가 발생했습니다.',
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    } else {
      await SwAlert.fire({
        title: options.hasErrorMessage || `${actionTitle} 요청이 실패하였습니다.`,
        icon: 'error',
        showCancelButton: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
    }
  }
}

const instance = new SwalHelper();
Object.freeze(instance);

export default instance;
