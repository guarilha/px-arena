type Pagination<T> = {
  data: T[]
  pagination: {
    totalDocs: number
    limit: number
    page: number
    totalPages: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: number | null
    nextPage: number | null
  }
}

export default Pagination
