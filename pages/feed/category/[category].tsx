import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import FeedCard from "../../../shared/components/layouts/appLayout/FeedCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@mui/material";

const FeedByCategory = () => {
  const router = useRouter();

  const [pageIndex, setPageIndex] = useState(0);
  //

  const [feed, setFeed] = useState<any[]>([]);
  const category = router.query.category;

  const initialFeeds = async () => {
    const { data }: any = await axios.get(
      `/api/feed/feedbycategory/${category}?page=${pageIndex}`
    );
    setFeed(data);
  };

  //

  useEffect(() => {
    initialFeeds();
  }, [router, pageIndex]);

  const prev = (num: number) => {
    if (num < 1) {
      return setPageIndex(0);
    } else {
      setPageIndex(num - 1);
    }
  };
  console.log(feed);
  return (
    <>
      <h3 className="centerwithFlex">{category}</h3>

      {feed?.map((feed: any, i: any) => {
        return <FeedCard feed={feed} key={i} />;
      })}

      {feed.length < 1 && (
        <h3 className="centerwithFlex">No Feed for {category} Yet</h3>
      )}
      <div className="categorybutton">
        <Button variant="contained" onClick={() => prev(pageIndex)}>
          Previous
        </Button>
        {feed.length === 3 && (
          <Button
            variant="contained"
            onClick={() => setPageIndex(pageIndex + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </>
  );
};

export default FeedByCategory;
