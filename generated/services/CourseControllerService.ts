/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseAdmitDTO } from "../models/CourseAdmitDTO";
import type { CourseAlterDTO } from "../models/CourseAlterDTO";
import type { CourseImportDTO } from "../models/CourseImportDTO";
import type { ResponseDataObject } from "../models/ResponseDataObject";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class CourseControllerService {
  /**
   * @param id
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static removeCourse(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/course/removeCourse",
      query: {
        id: id,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * @param requestBody
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static importCourse(
    requestBody: CourseImportDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/course/importCourse",
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
  public static alterCourse(
    requestBody: CourseAlterDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/course/alterCourse",
      body: requestBody,
      mediaType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * @param courseAdmitDto
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static admitCourse(
    courseAdmitDto: CourseAdmitDTO,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/course/admitCourse",
      query: {
        courseAdmitDTO: courseAdmitDto,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * @param week
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getCoursesByWeek(
    week: string,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCoursesByWeek",
      query: {
        week: week,
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * @param type
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getCoursesByType(
    type: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCoursesByType",
      query: {
        type: type,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param teacherId
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getCoursesByTeacherId(
    teacherId: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCoursesByTeacherId",
      query: {
        teacherId: teacherId,
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
  public static getCoursesByStatus(
    status: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCoursesByStatus",
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
  public static getCoursesBySemester(
    semester: string,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCoursesBySemester",
      query: {
        semester: semester,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   * @param namePrefix
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getCoursesByNamePrefix(
    namePrefix: string,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCoursesByNamePrefix",
      query: {
        namePrefix: namePrefix,
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
  public static getCoursesByLabId(
    labId: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCoursesByLabId",
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
   * @returns ResponseDataObject OK
   * @throws ApiError
   */
  public static getCourseById(
    id: number,
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getCourseById",
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
  public static getAllCourses(
    token: string
  ): CancelablePromise<ResponseDataObject> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/course/getAllCourses",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
