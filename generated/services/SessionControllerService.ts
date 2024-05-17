/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResponseDataObject } from "../models/ResponseDataObject";
import type { SessionAlterDTO } from "../models/SessionAlterDTO";
import type { SessionImportDTO } from "../models/SessionImportDTO";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class SessionControllerService {
  /**
   * @param id
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static removeSession(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/session/removeSession",
      query: {
        "id": id
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param requestBody
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static importSession(
    requestBody: SessionImportDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/session/importSession",
      body: requestBody,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param requestBody
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static alterSession(
    requestBody: SessionAlterDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/session/alterSession",
      body: requestBody,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param id
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getSessionById(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/session/getSessionById",
      query: {
        "id": id
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getAllSessions(token: string): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/session/getAllSessions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
