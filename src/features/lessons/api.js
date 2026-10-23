import { platformApi } from '../journey/api'
export const lessonsApi = {
  list: (options) => platformApi.getLessons(options),
  save: (input) => platformApi.saveLesson(input),
  remove: (id) => platformApi.deleteLesson(id),
  complete: (id) => platformApi.completeLesson(id),
  getCompletions: () => platformApi.getCompletions(),
}
