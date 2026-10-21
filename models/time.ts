export type Duration = Partial<Record<Intl.DurationFormatUnit, number>>;

export interface LessThanTime {
  type: "less-than";
  amount: Duration;
}

export interface ExactTime {
  type: "exact";
  amount: Duration;
}

export interface MoreThanTime {
  type: "more-than";
  amount: Duration;
}

export interface BetweenTime {
  type: "between";
  min: Duration;
  max: Duration;
}

export type Time =
  | LessThanTime
  | ExactTime
  | MoreThanTime
  | BetweenTime;

export function formatTime(time: Time, lang: string) {
  const format = new Intl.DurationFormat(lang, { style: "narrow" });
  switch (time.type) {
    case "less-than":
      return `< ${format.format(time.amount)}`;
    case "exact":
      return `${format.format(time.amount)}`;
    case "more-than":
      return `> ${format.format(time.amount)}`;
    case "between":
      return `${format.format(time.min)} - ${format.format(time.max)}`;
  }
}
