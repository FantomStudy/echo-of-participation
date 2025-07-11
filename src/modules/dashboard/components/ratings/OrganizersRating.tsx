import { Link } from "@tanstack/react-router";

import { declineWord, formatName } from "@/utils/format";

import { useOrganizersRating } from "../../api/queries";
import Rating from "./Rating";

const OrganizersRating = () => {
  const { data, isLoading, isError } = useOrganizersRating();

  return (
    <Rating
      title="Оценка вовлеченности сотрудников"
      data={data!}
      isLoading={isLoading}
      isError={isError}
      renderItem={(org) => (
        <Link to="/">
          <b>{formatName(org.fullName)}</b> - {org.eventCount}{" "}
          {declineWord(org.eventCount, [
            "мероприятие",
            "мероприятия",
            "мероприятий",
          ])}
        </Link>
      )}
    />
  );
};

export default OrganizersRating;
