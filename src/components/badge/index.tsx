import React from "react";

export interface BadgeProps {
  rules: {
    status: number;
    text: string;
    color: string;
  }[];
  status: number;
}

const Badge: React.FC<BadgeProps> = (props) => {
  const activeRule = props.rules.find((rule) => rule.status === props.status);
  return (
    <div>
      <div className="flex flex-row items-center gap-2">
        {activeRule?.text && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded `}
            style={{
              backgroundColor: `${activeRule?.color}50`,
              color: activeRule?.color,
            }}
          >
            {activeRule?.text}
          </span>
        )}
      </div>
    </div>
  );
};

export default Badge;