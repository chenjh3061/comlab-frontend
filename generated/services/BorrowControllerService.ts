/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BorrowAdmitDTO } from "../models/BorrowAdmitDTO";
import type { BorrowAlterDTO } from "../models/BorrowAlterDTO";
import type { BorrowCompleteDTO } from "../models/BorrowCompleteDTO";
import type { BorrowImportDTO } from "../models/BorrowImportDTO";
import type { ResponseDataObject } from "../models/ResponseDataObject";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class BorrowControllerService {
  /**
   * @param id
   * @param token
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static removeBorrow(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/borrow/removeBorrow",
      query: {
        id: id,
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
  public static importBorrow(
    requestBody: BorrowImportDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/borrow/importBorrow",
      body: requestBody,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param borrowCompleteDto
   * @param token
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static completeBorrow(
    borrowCompleteDto: BorrowCompleteDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/borrow/completeBorrow",
      query: {
        borrowCompleteDTO: borrowCompleteDto,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param requestBody
   * @param token
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static alterBorrow(
    requestBody: BorrowAlterDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/borrow/alterBorrow",
      body: requestBody,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param borrowAdmitDto
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static admitBorrow(
    borrowAdmitDto: BorrowAdmitDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/borrow/admitBorrow",
      body: borrowAdmitDto,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param week
   * @param token
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getBorrowsByWeek(
    week: string,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/borrow/getBorrowsByWeek",
      query: {
        week: week,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param studentId
   * @param token
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getBorrowsByTeacherId(
    studentId: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/borrow/getBorrowsByStudentId",
      query: {
        studentId: studentId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param status
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getBorrowsByStatus(
    status: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/borrow/getBorrowsByStatus",
      query: {
        status: status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param semester
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getBorrowsBySemester(
    semester: string,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/borrow/getBorrowsBySemester",
      query: {
        semester: semester,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param labId
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getBorrowsByLabId(
    labId: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/borrow/getBorrowsByLabId",
      query: {
        labId: labId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param id
   * @param token
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getBorrowById(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/borrow/getBorrowById",
      query: {
        id: id,
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
  public static getAllBorrows(
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/borrow/getAllBorrows",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
