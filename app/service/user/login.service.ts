import { UserModel } from "@/app/model/user/user.model";
import api from "@/app/api/axios";
import requests from "@/app/api/requests";
// import { setToken } from "@/lib/features/auth.slice";
import { setAccessToken } from "@/app/api/authUtils";

export const login = async (username: string, password: string): Promise<any> => {
  try {
    const response = await api.post<UserModel>(requests.fetchLogin,
      { username, password }
    )

    const token = response.headers['Authorization']
    console.log("전체 응답 헤더:", response.headers);
    console.log("Authorization 헤더:", response.headers['Authorization']);
    console.log("authorization 헤더 (소문자):", response.headers['authorization']);
    console.log(response.headers)
    
    if (token) {
      console.log("토큰이 보이긴 해요")
      setAccessToken(token);
      console.log(response.config);
      return response.config.data;
    } else {
      console.log("토큰이 안보여요 ㅠㅠ")
      throw new Error('토큰을 받지 못했습니다.');
    }
  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('주소 검색 중 오류 발생');
    }
  }
};

export const get = async (): Promise<UserModel> => {
  try {
    const response = await api.get<any>("/get")

    console.log("GET: ", response)
    return response.data;

  } catch (error: any) {
    if (error.response) {
      console.error('Server Error:', error.response.data);
      throw new Error('서버에서 오류가 발생했습니다.');
    } else if (error.request) {
      console.error('No Response:', error.request);
      throw new Error('서버 응답이 없습니다.');
    } else {
      console.error('Error:', error.message);
      throw new Error('주소 검색 중 오류 발생');
    }
  }
};
// login.service.ts
export const oauth = async (router: any): Promise<void> => {
  try {
    const oauthUrl = process.env.NEXT_PUBLIC_OAUTH_URL;
    
    if (!oauthUrl) {
      throw new Error('OAuth URL is not defined');
    }
    console.log(oauthUrl)

    if (oauthUrl.startsWith('http') || oauthUrl.startsWith('https')) {
      // 외부 URL인 경우
      window.location.href = oauthUrl;
      
    } else {
      // 내부 경로인 경우
      await router.push(oauthUrl);
    }
  } catch (error: any) {
    console.error('OAuth redirection failed:', error);
    throw new Error('OAuth 인증 중 오류가 발생했습니다.');
  }
};