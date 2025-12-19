"use client";

import { ValidationResult } from "@/types/pairing";
import { Card } from "@/components/shared/Card";
import { Badge } from "@/components/shared/Badge";

interface ValidationPanelProps {
  validation: ValidationResult;
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({ validation }) => {
  const scoreColors = {
    excellent: "bg-success/10 text-success",
    acceptable: "bg-warning/10 text-warning",
    poor: "bg-error/10 text-error",
  };

  const scoreLabels = {
    excellent: "Excellent",
    acceptable: "Acceptable",
    poor: "Not recommended",
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Validation</h2>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium">Score:</span>
          <Badge
            variant="default"
            className={scoreColors[validation.score]}
          >
            {scoreLabels[validation.score]}
          </Badge>
        </div>
        <p className="text-xs text-neutral-500">
          {validation.warnings} warning{validation.warnings !== 1 ? "s" : ""}, {validation.errors} error{validation.errors !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-3">
        {validation.checks.map((check, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border ${
              check.passed
                ? "bg-success/5 border-success/20"
                : "bg-error/5 border-error/20"
            }`}
          >
            <div className="flex items-start justify-between mb-1">
              <span className="text-sm font-medium capitalize">
                {check.type.replace("-", " ")}
              </span>
              {check.passed ? (
                <span className="text-success text-xs">✓</span>
              ) : (
                <span className="text-error text-xs">✗</span>
              )}
            </div>
            <p className="text-xs text-neutral-600 mb-1">{check.message}</p>
            {check.suggestion && (
              <p className="text-xs text-neutral-500 italic">
                💡 {check.suggestion}
              </p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

