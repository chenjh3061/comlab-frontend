/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LabAlterDTO } from "../models/LabAlterDTO";
import type { LabImportDTO } from "../models/LabImportDTO";
import type { ResponseDataObject } from "../models/ResponseDataObject";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class LabControllerService {
  /**
   * @param id
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static removeLab(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/lab/removeLab",
      query: {
        "id": id
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @param requestBody
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static importLab(
    requestBody: LabImportDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/lab/importLab",
      body: requestBody,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @param requestBody
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static alterLab(
    requestBody: LabAlterDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/lab/alterLab",
      body: requestBody,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @param type
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getLabsByType(
    type: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lab/getLabsByType",
      query: {
        "type": type
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @param numberPrefix
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getLabsByNumberPrefix(
    numberPrefix: string,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lab/getLabsByNumberPrefix",
      query: {
        "numberPrefix": numberPrefix
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @param namePrefix
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getLabsByNamePrefix(
    namePrefix: string,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lab/getLabsByNamePrefix",
      query: {
        "namePrefix": namePrefix
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @param equipmentNum
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getLabsByLeastEquipmentNum(
    equipmentNum: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lab/getLabsByLeastEquipmentNum",
      query: {
        "equipmentNum": equipmentNum
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @param labAdminId
   * @param token
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getLabsByLabAdminId(
    labAdminId: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lab/getLabsByLabAdminId",
      query: {
        "lab_admin_id": labAdminId
      },
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
  public static getLabById(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lab/getLabById",
      query: {
        "id": id
      },
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  /**
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getAllLabs(token: string): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/lab/getAllLabs",
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  }
}
