import { platformApi } from '../journey/api'
export const adminApi = {
  getStudents: () => platformApi.getStudents(),
  getUsers: () => platformApi.getUsers(),
  getOverview: () => platformApi.getOverview(),
  getMentors: () => platformApi.getMentors(),
  promote: (id, role) => platformApi.updateProfileRole(id, role),
  assignMentor: (studentId, mentorId) => platformApi.assignMentor(studentId, mentorId),
}
