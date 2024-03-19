import { type PromoteAccountModel } from '@auth/domain/ports/application/application-domain.model'
import { type PromoteAccountPort } from '@auth/domain/ports/application/application-domain.port'
import { type HttpRequestModel } from '@core/application/models/http/http-request.model'
import { type HttpResponseModel } from '@core/application/models/http/http-response.model'
import { type ControllerInputPort } from '@core/application/ports/controller-input.port'
import { type PresenterOutputPort } from '@core/application/ports/presenter-output.port'
import RequestValidationErrorPresenter from '@core/application/presenter/request-validation.presenter'
import { type EmptyResponseModel } from '@core/domain/models/api/controller.model'
import { objectKeyExists } from '@core/shared/utils/object-key-exist'

export default class PromoteGuestUserToStudenUseCase implements ControllerInputPort<EmptyResponseModel | never> {
  constructor (
    private readonly service: PromoteAccountPort,
    private readonly presenter: PresenterOutputPort<EmptyResponseModel>
  ) {}

  async handleRequest (request: HttpRequestModel<PromoteAccountModel>): Promise<HttpResponseModel<EmptyResponseModel>> {
    if (!objectKeyExists(request, 'body')) {
      throw new RequestValidationErrorPresenter('Error in request body')
    }

    await this.service.promote({ ...request.body })
    return await this.presenter.handleResponse({}, 'promocion de cuenta exitoso!')
  }
}
