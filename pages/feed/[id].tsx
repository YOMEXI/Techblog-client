import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import FeedCommentCard from "../../shared/components/forms/feedComment";
import FeedCard from "../../shared/components/layouts/appLayout/FeedCard";

const SingleFeed = () => {
  const router = useRouter();

  const id = Number(router.query.id);
  const { data: feed } = useSWR(id ? `/api/feed/${id}` : "");
  const comment = feed?.comment?.map((comment: any) => comment);
  return (
    <>
      <FeedCard feed={feed} />
      <FeedCommentCard comment={comment} />
    </>
  );
};

export default SingleFeed;
