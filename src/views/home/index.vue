<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <router-link to="/"
                ><img :src="article.author.image"
              /></router-link>
              <div class="info">
                <router-link to="/" class="author">{{ article.author.username }}</router-link>
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
               :class="{
                 active: article.favorited
               }">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <router-link to="/" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </router-link>
          </div>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">programming</a>
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">emberjs</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Article, getArticles } from '@/api/article'

const useArticles = () => {
  // 本地创建了响应式数据，并把Article类型导入，初始是一个空数组，里面的值应该是Article类型
  const articles = ref<Article[]>([])
  // 初始的articlesCount应该是响应式的，初始为0
  const articlesCount = ref(0)
  // 加载文章列表并赋值
  const loadArticles = async () => {
    const { data } = await getArticles()
    articles.value = data.articles
    articlesCount.value = data.articlesCount
  }
  // 在DOM初始化完执行
  onMounted(loadArticles)
  return {
    articles,
    articlesCount
  }
}
export default defineComponent({
  setup () {
    return {
      ...useArticles()
    }
  }
})
</script>

<style>

</style>
