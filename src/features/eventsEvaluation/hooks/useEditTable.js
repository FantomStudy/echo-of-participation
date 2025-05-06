import { useEffect, useState } from "react";

import { getMaxRatingByRole } from "../utils/authorityUtils";

export const useEditTable = ({ userData, events, mutateFn }) => {
  const [localEvents, setLocalEvents] = useState(events);

  useEffect(() => setLocalEvents(events), [events]);

  const handleRatingChange = (index, value) => {
    setLocalEvents((prev) =>
      prev.map((event, i) =>
        i === index ? { ...event, rating: value } : event,
      ),
    );
  };

  const saveEventRating = async (eventId, point) => {
    const normalizedPoint = point.trim().replace(",", ".");
    const parsedPoint =
      normalizedPoint === "" ? null : parseFloat(normalizedPoint);

    if (
      parsedPoint !== null &&
      (isNaN(parsedPoint) || parsedPoint < 0 || parsedPoint > maxRating)
    ) {
      setLocalEvents((prev) =>
        prev.map((item) =>
          item.id === eventId ? { ...item, rating: null } : item,
        ),
      );

      return;
    }

    const roundedPoint = Math.round(parsedPoint * 10) / 10;

    try {
      const ratingData = [
        {
          eventId,
          userId: userData.id,
          point: roundedPoint,
        },
      ];

      mutateFn(ratingData);
    } catch {
      setLocalEvents((prev) =>
        prev.map((item) =>
          item.eventId === eventId ? { ...item, rating: null } : item,
        ),
      );
    }
  };

  const maxRating = getMaxRatingByRole(userData.roleName);

  return { maxRating, localEvents, saveEventRating, handleRatingChange };
};
