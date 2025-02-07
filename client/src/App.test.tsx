import App from "./App";
import { render, screen } from "@testing-library/react";
import { getComments, getReplies } from "./services/comments";
// import * as commentService from "./services/comments"
import { CommentWithReplies, Reply } from "./types";
import userEvent from "@testing-library/user-event";

vi.mock("./services/comments.ts");

const mockedGetComments = vi.mocked(getComments);
const mockedGetReplies = vi.mocked(getReplies);

// const mockedCommentService = vi.mocked(commentService)

it("fetches comments", async () => {
  const mockedComments: CommentWithReplies[] = [
    {
      id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Satya",
      body: "Happy Birthday",
      postedAt: 1550488214207,
      replies_count: 3,
      replies: [
        {
          id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
          comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
          author: "Kathleen Nikolaus",
          body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
          postedAt: 1550419941546,
        },
      ],
    },
  ];

  mockedGetComments.mockResolvedValue(mockedComments);
  render(<App />);
  const author = await screen.findByRole("heading", {
    level: 3,
    name: /Satya/,
  });
  expect(author).toBeInTheDocument();
});

it("removes the link show more replies when it is clicked", async () => {
  const mockedComments: CommentWithReplies[] = [
    {
      id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Satya",
      body: "Happy Birthday",
      postedAt: 1550488214207,
      replies_count: 2,
      replies: [
        {
          id: "116dbd01-d5f3-4dfb-afeb-f822a9264a5e",
          comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
          author: "Kathleen Nikolaus",
          body: "Officia suscipit sint sint impedit nemo. Labore aut et quia quasi ut. Eos voluptatibus quidem eius delectus beatae excepturi.",
          postedAt: 1550419941546,
        },
      ],
    },
  ];
  const mockedReplies: Reply[] = [
    {
      id: "1d549a1b-4db1-4c10-9941-60c3a0c111cb",
      comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      author: "Sean Bechtelar",
      body: "Quam ea est provident enim necessitatibus. Sint veniam sed iusto omnis eaque dolores voluptas omnis ipsa. Vero cupiditate corrupti amet.",
      postedAt: 1550434979501,
    },
  ];
  mockedGetComments.mockResolvedValue(mockedComments);
  mockedGetReplies.mockResolvedValue(mockedReplies);
  render(<App />);
  const link = await screen.findByRole("link", { name: /Show More Replies/ });
  const user = userEvent.setup();
  await user.click(link);
  const removedLink = screen.queryByRole("link", { name: /Show More Replies/ });
  expect(removedLink).not.toBeInTheDocument();
});

// findByRole = getByRole + waitFor
// await waitFor(() => {
//   const author = screen.getByRole("heading", { level: 3, name: /Carmen/ });
//   expect(author).toBeInTheDocument();
// });

// async function => mocked version will return promise that resolves to undefined
// sync function => mocked version will return undefined

// export const getReplies = async () => {

// }

// queryByRole -> returns null when the element is not found
