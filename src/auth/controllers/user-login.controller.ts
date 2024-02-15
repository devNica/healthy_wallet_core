import { type UserLoginIC } from '@auth/models/controllers/controller-input.model'
import { type UserLoginOC } from '@auth/models/controllers/controller-output.model'
import { type UserLoginSrvI } from '@auth/services/user-login.service'
import RequestValidationErrorPresenter from '@core/adapters/primary/presenters/req-validation-error.presenter'
import { type HttpRequestModel } from '@core/models/http/http-request.model'
import { type HttpResponseModel } from '@core/models/http/http-response.model'
import { type ControllerInputPort } from '@core/ports/input/controller-input.port'
import { type PresenterOutputPort } from '@core/ports/output/presenter/presenter-output.port'
import { objectKeyExists } from '@core/shared/utils/object-key-exists'

export default class UserLoginController implements ControllerInputPort<UserLoginOC | never> {
  constructor (
    private readonly service: UserLoginSrvI,
    private readonly presenter: PresenterOutputPort<UserLoginOC>
  ) {}

  async handleRequest (request: HttpRequestModel<UserLoginIC>): Promise<HttpResponseModel<UserLoginOC>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    const result = await this.service.login({ ...request.body })
    return await this.presenter.handleResponse(result, 'Inicio de Sesion Exitoso')
  }
}
