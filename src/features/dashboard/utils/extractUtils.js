export const extractEvents = (data = []) => {
  if (data.length === 0) return [];
  return data[0].events.map((event, index) => ({
    name: event.name,
    key: `event-${index + 1}`,
  }));
};

export const extractEntities = (data = []) => {
  return data.map((entity) => ({
    id: entity.id,
    name: entity.name,
  }));
};

export const extractTraffic = (data = []) => {
  return data.reduce((acc, entity) => {
    acc[entity.id] = {};
    entity.events.forEach((event, index) => {
      acc[entity.id][`event-${index + 1}`] = event.point.toString();
    });
    return acc;
  }, {});
};
