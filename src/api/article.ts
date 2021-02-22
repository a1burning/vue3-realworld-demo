import { request } from '../utils/request'

// 入参，可选
interface ArticlesParams {
  tag?: string
  author?: string
  favorited?: string
  limit?: number
  offset?: number
}

// 返回值，只要有对象的就提出来，方便重用
interface ArticleAuthor {
  username: string
  bio: string
  image: string
  following: boolean
}

// 导出，为了首页初始化数据的时候使用
export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: ArticleAuthor
}

// articles里面是Article类型的数组
interface ArticlesPayload {
  articles: Article[]
  articlesCount: number
}

// 入参和返回值都设置了类型
export const getArticles = (params?: ArticlesParams) => {
  return request.get<ArticlesPayload>('/api/articles')
}
