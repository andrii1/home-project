import React, { useEffect, useState } from 'react';

import { apiURL } from '../../apiURL';
import './Prompts.Style.css';

import { Pagination } from '../../components/Pagination/Pagination.component';

export const Prompts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [searchedCategories, setSearchedCategories] = useState('');
  const [searchedTopics, setSearchedTopics] = useState('');
  useEffect(() => {
    async function fetchPrompts() {
      const url = `${apiURL()}/prompts/`;
      const response = await fetch(url);
      const promptsResponse = await response.json();

      if (filteredCategories.length > 0 && filteredTopics.length > 0) {
        const filteredPrompts = promptsResponse.filter((item) =>
          filteredTopics.includes(item.topic_id),
        );
        setPrompts(filteredPrompts);
      } else if (filteredCategories.length > 0) {
        const filteredPrompts = promptsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        setPrompts(filteredPrompts);
      } else if (filteredTopics.length > 0) {
        const filteredPrompts = promptsResponse.filter((item) =>
          filteredTopics.includes(item.topic_id),
        );
        setPrompts(filteredPrompts);
      } else {
        setPrompts(promptsResponse);
      }
    }
    async function fetchCategories() {
      const response = await fetch(`${apiURL()}/categories/`);
      const categoriesResponse = await response.json();
      if (searchedCategories) {
        const filteredCategoriesSearch = categoriesResponse.filter((item) =>
          item.title.toLowerCase().includes(searchedCategories.toLowerCase()),
        );
        setCategories(filteredCategoriesSearch);
      } else {
        setCategories(categoriesResponse);
      }
    }
    async function fetchTopics() {
      const response = await fetch(`${apiURL()}/topics/`);
      const topicsResponse = await response.json();
      if (filteredCategories.length > 0 && searchedTopics.length > 0) {
        const relatedPrompts = topicsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        const filteredTopicsSearch = relatedPrompts.filter((item) =>
          item.title.toLowerCase().includes(searchedTopics.toLowerCase()),
        );
        console.log('filteredTopicsSearch', filteredTopicsSearch);
        setTopics(filteredTopicsSearch);
      } else if (searchedTopics.length > 0) {
        const filteredTopicsSearch = topicsResponse.filter((item) =>
          item.title.toLowerCase().includes(searchedTopics.toLowerCase()),
        );
        console.log('filteredTopicsSearch', filteredTopicsSearch);
        setTopics(filteredTopicsSearch);
      } else if (filteredCategories.length > 0) {
        const relatedPrompts = topicsResponse.filter((item) =>
          filteredCategories.includes(item.category_id),
        );
        setTopics(relatedPrompts);
      } else {
        setTopics(topicsResponse);
      }
    }
    fetchPrompts();
    fetchCategories();
    fetchTopics();
  }, [filteredCategories, filteredTopics, searchedCategories, searchedTopics]);

  const filterHandlerCategories = (event) => {
    if (event.target.checked) {
      setFilteredCategories([
        ...filteredCategories,
        parseInt(event.target.value, 10),
      ]);
    } else {
      setFilteredCategories(
        filteredCategories.filter(
          (filterCategory) =>
            filterCategory !== parseInt(event.target.value, 10),
        ),
      );
    }
  };

  const filterHandlerTopics = (event) => {
    if (event.target.checked) {
      setFilteredTopics([...filteredTopics, parseInt(event.target.value, 10)]);
    } else {
      setFilteredTopics(
        filteredTopics.filter(
          (filterTopic) => filterTopic !== parseInt(event.target.value, 10),
        ),
      );
    }
  };

  const handleSearchCategories = (event) => {
    setSearchedCategories(event.target.value);
    console.log(searchedCategories);
  };
  const handleSearchTopics = (event) => {
    setSearchedTopics(event.target.value);
    console.log(searchedTopics);
  };
  const promptsList = prompts.map((prompt) => (
    <div key={prompt.id} className="row prompts-body">
      <div className="col-1">{prompt.title}</div>
      <div className="col-2">Text goes here</div>
      <div className="col-3">{prompt.categoryTitle}</div>
      <div className="col-4">{prompt.topicTitle}</div>
      <div className="col-5">Rating</div>
      <div className="col-6">👍 / 👎</div>
      <div className="col-7">❤️</div>
      <div className="col-8">fb</div>
    </div>
  ));
  const categoriesList = categories.map((category) => (
    <li key={category.id}>
      <input
        type="checkbox"
        value={category.id}
        onChange={filterHandlerCategories}
      />{' '}
      {category.title}
    </li>
  ));
  const topicsList = topics.map((topic) => (
    <li key={topic.id}>
      <input type="checkbox" value={topic.id} onChange={filterHandlerTopics} />{' '}
      {topic.title}
    </li>
  ));

  return (
    <main>
      <h1 className="hero-header">Prompts</h1>

      <section className="container-prompts">
        <div className="prompts-filter">
          <div className="tab-filter">Categories</div>
          <input
            type="text"
            placeholder="Search categories"
            className="input-search-filter"
            onChange={handleSearchCategories}
          />
          <div className="checkboxes">
            <ul className="checkboxes-list">{categoriesList}</ul>
          </div>
          <div className="tab-filter">Topics / Subcategories</div>
          <input
            type="text"
            placeholder="Search topics"
            className="input-search-filter"
            onChange={handleSearchTopics}
          />
          <div className="checkboxes">
            <ul className="checkboxes-list">{topicsList}</ul>
          </div>
        </div>
        <div className="prompts-table">
          <div className="row prompts-header">
            <div className="col-1">Prompt</div>
            <div className="col-2">Description</div>
            <div className="col-3">Category</div>
            <div className="col-4">Topic</div>
            <div className="col-5">Rating</div>
            <div className="col-6">Helpful?</div>
            <div className="col-7">Bookmark</div>
            <div className="col-8">Share</div>
          </div>
          {promptsList}
        </div>
      </section>
      <Pagination />
    </main>
  );
};
