import { platformApi } from '../journey/api'
export const liveApi = {
  list: () => platformApi.getLiveSessions(),
  get: (id) => platformApi.getLiveSession(id),
  save: (input) => platformApi.saveLiveSession(input),
  markAttendance: (sessionId, studentName) => platformApi.markAttendance(sessionId, studentName),
  getStudents: () => platformApi.getStudents(),
  listLessons: (options) => platformApi.getLessons(options),
}
