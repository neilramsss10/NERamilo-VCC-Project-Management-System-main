import React, { useCallback, useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../actions/projects";

import useStyles from "./styles";

function Query() {
 return new URLSearchParams(useLocation().search);
}

const Paginate = () => {
    const query = Query();
    const page = query.get('page') || 1;
    const { numberOfPages } = useSelector((state) => state.projects)
    const user = JSON.parse(localStorage.getItem('profile'));
    let userId = process.env.USER_ID || user?.result?.rows[0]?.users_id;
    const classes = useStyles();
    const dispatch = useDispatch();
    const isPage = page > 0;

    if (!userId) {
        userId = query.get('userId');
      }

    const updateQueryString = useCallback((key, value) => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      const newUrl = window.location.pathname + "?" + searchParams.toString();
      window.history.pushState({ path: newUrl }, "", newUrl);
    }, []);

    useEffect(() => {
      if (isPage && userId) {
          dispatch(getProjects(page, userId));
          updateQueryString('userId', userId);
      }
    }, [page, userId, dispatch, isPage, updateQueryString]);

    useQuery(["projects", page, userId], () => {
        if (isPage && userId) {
            dispatch(getProjects(page, userId));
        }
    });

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outline"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/projects?page=${item.page}&userId=${userId}`} />
            )}
        />
    )
}

export default Paginate;
