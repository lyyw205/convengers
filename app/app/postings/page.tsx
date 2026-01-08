import Link from "next/link";
import styles from "../portal.module.css";
import { postingItems } from "../../lib/sample-data";

export default function PostingListPage() {
  return (
    <div className={styles.card}>
      <h2>Project postings</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Role</th>
            <th>Duration</th>
            <th>Budget</th>
            <th>Skills</th>
          </tr>
        </thead>
        <tbody>
          {postingItems.map((post) => (
            <tr key={post.id}>
              <td>
                <Link href={`/app/postings/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.duration}</td>
              <td>{post.budget}</td>
              <td>{post.skills.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
