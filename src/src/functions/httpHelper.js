class HttpHelper {
  constructor() {
    if (!HttpHelper.instance) {
      HttpHelper.instance = this;
    }
    return HttpHelper.instance;
  }

  /**
   * response를 받으면 statusCode와 body를 분석해서 리턴하는 Helper
   * @param response
   * @param listFieldName
   * @param err
   * @returns 분석된 body {
   *    success: boolean,
   *    isRetry: boolean,
   *    ongoing: boolean,
   *    hasError: boolean,
   *    data,
   *    list: (*|*[]), status
   *    page,
   *    link: *,
   *    }
   */
  // eslint-disable-next-line class-methods-use-this
  convertResult(response, listFieldName = null, err = null) {
    const { data } = response; // body 가져오기
    // eslint-disable-next-line no-underscore-dangle
    const link = response.data._links; // HATEOAS link 가져오기
    // eslint-disable-next-line no-underscore-dangle
    const list = listFieldName !== null && response.data._embedded
      // eslint-disable-next-line no-underscore-dangle
      ? response.data._embedded[listFieldName] : []; // list 가져오기
    const { page } = response.data; // page 정보 가져오기
    return {
      status: response.status,
      success: response.status === 200,
      creating: response.status === 201,
      ongoing: response.status === 202,
      isRetry: response.status === 410, // GONE => 만료됐으니 다시 시도해
      unAuth: response.status === 401, // 인증이 안되면 401 줌, (현재는 이 케이스가 없음)
      forbidden: response.status === 403, // ARA 권한이 없어서 실패하는 경우
      notFound: response.status === 404, // URI 상 요청 대상이 없으면 404 줌
      notAllow: response.status === 405, // 유효성 체크 실패 시 405 줌
      hasConflict: response.status === 409, // 409 Conflict 무언가 중복되었을 때 (현재 템플릿 등록 시 사용)
      hasError: response.status >= 400,
      hasServerError: response.status >= 500,
      data,
      list,
      page,
      link,
      err,
    };
  }

  convertError(error) {
    if (error.response) {
      return this.convertResult(error.response, error);
    }
    return error; // convert 는 response 가 있을 때만 하고, 그외에는 bypass
  }
}

const instance = new HttpHelper();
Object.freeze(instance);

export default instance;
