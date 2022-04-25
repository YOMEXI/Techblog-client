import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import FeedCard from "../../../shared/components/layouts/appLayout/FeedCard";
import InfiniteScroll from "react-infinite-scroll-component";

const FeedByCategory = () => {
  const router = useRouter();

  const [pageNumber, setpageNumber] = useState(0);
  //
  const [hasMore, sethasMore] = useState(true);
  const [feed, setFeed] = useState<any[]>([]);
  const category = router.query.category;

  const initialFeeds = async () => {
    const { data }: any = await axios.get(
      `/api/feed/feedbycategory/${category}?page=${pageNumber}`
    );
    setFeed(data);
  };

  const allFeed = async () => {
    const { data }: any = await axios.get(
      `/api/feed/feedbycategory/${category}?page=${pageNumber + 1}`
    );

    if (data.length === 0) sethasMore(false);
    setFeed((prev) => [...prev, ...data]);
    setpageNumber((prev) => prev + 1);
  };

  //

  useEffect(() => {
    initialFeeds();
  }, [router]);

  console.log(feed.length);
  return (
    <>
      <h3 className="centerwithFlex">{category}</h3>

      {category && (
        <InfiniteScroll
          hasMore={hasMore}
          next={allFeed}
          dataLength={feed.length}
          loader={<div className=" centerwithFlex">Loading More</div>}
        >
          {feed?.map((feed: any, i: any) => {
            return <FeedCard feed={feed} key={i} />;
          })}
        </InfiniteScroll>
      )}

      {category && feed?.length === 0 && (
        <h3 className="centerwithFlex">No Feed for {category} Yet</h3>
      )}
    </>
  );
};

export default FeedByCategory;
