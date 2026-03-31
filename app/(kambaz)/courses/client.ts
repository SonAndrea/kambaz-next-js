import axios from "axios";
// Create instance that automatically handles session cookies/credentials
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

// --- COURSE APIS ---

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API); // Publicly viewable courses
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  // Use axiosWithCredentials if your backend verifies ownership
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// --- MODULE APIS ---

export const findModulesForCourse = async (courseId: string) => {
  // Often requires credentials to verify the user is enrolled in the course
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  // Must use credentials to identify who is creating the module
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (moduleId: string) => {
  // Use credentials to ensure only authorized users can delete
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: any) => {
  // Use credentials for updates
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};