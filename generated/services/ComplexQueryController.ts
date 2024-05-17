/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { AvailableLabSessionDTO } from "../models/AvailableLabSessionDTO";
import { CourseLabSessionDTO } from "../models/CourseLabSessionDTO";
import { request as __request } from "../core/request";
import { CancelablePromise } from "../core/CancelablePromise";
import { ResponseDataObject } from "../models/ResponseDataObject";
import { OpenAPI } from "../core/OpenAPI";

export class ComplexQueryController {
  public static getAvailableLabSession(
    availableLabSessionDTO: AvailableLabSessionDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/query/getAvailableLabSession",
      body: availableLabSessionDTO,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public static getCourseLabSession(
    courseLabSessionDTO: CourseLabSessionDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/query/getCourseLabSession",
      body: courseLabSessionDTO,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
