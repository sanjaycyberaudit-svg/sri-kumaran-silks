"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AdminLoadingState,
  LoadingButtonLabel,
} from "@/components/admin/AdminLoadingState";
import { fetchWithTimeout } from "@/lib/network/fetchWithTimeout";

type ApiSettingRecord = {
  key: string;
  isEnabled: boolean;
  value: Record<string, unknown>;
} | null;

type IntegrationsPayload = {
  stockControl: ApiSettingRecord;
};

type FormState = {
  enabled: boolean;
  lowStockThreshold: number;
};

const DEFAULT_FORM: FormState = {
  enabled: false,
  lowStockThreshold: 5,
};

const MIN_LOW_STOCK = 1;
const MAX_LOW_STOCK = 99;

function clampLowStockThreshold(raw: string, fallback: number) {
  const parsed = Number(raw.trim());
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(MAX_LOW_STOCK, Math.max(MIN_LOW_STOCK, Math.round(parsed)));
}

export function StockControlForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [thresholdDraft, setThresholdDraft] = useState(
    String(DEFAULT_FORM.lowStockThreshold),
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetchWithTimeout("/api/admin/integrations", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Could not load stock setting");
        const payload = (await res.json()) as IntegrationsPayload;
        if (cancelled) return;

        const storedThreshold = Number(
          payload.stockControl?.value?.lowStockThreshold ??
            DEFAULT_FORM.lowStockThreshold,
        );
        const lowStockThreshold = Number.isFinite(storedThreshold)
          ? Math.min(
              MAX_LOW_STOCK,
              Math.max(MIN_LOW_STOCK, Math.round(storedThreshold)),
            )
          : DEFAULT_FORM.lowStockThreshold;

        setForm({
          enabled: payload.stockControl?.isEnabled ?? DEFAULT_FORM.enabled,
          lowStockThreshold,
        });
        setThresholdDraft(String(lowStockThreshold));
      } catch (error) {
        toast({
          title: "Could not load stock setting",
          description: error instanceof Error ? error.message : "Please retry",
          variant: "destructive",
        });
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const saveDisabled = useMemo(
    () => isLoading || isSaving,
    [isLoading, isSaving],
  );

  const onSave = async () => {
    const lowStockThreshold = clampLowStockThreshold(
      thresholdDraft,
      form.lowStockThreshold,
    );
    setForm((prev) => ({ ...prev, lowStockThreshold }));
    setThresholdDraft(String(lowStockThreshold));

    setIsSaving(true);
    try {
      const res = await fetchWithTimeout("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "stock_control",
          isEnabled: form.enabled,
          value: { lowStockThreshold },
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Save failed");
        throw new Error(text || "Save failed");
      }

      toast({
        title: "Stock setting saved",
        description: form.enabled
          ? `Low stock will show below ${lowStockThreshold}.`
          : "Stock control is disabled. Storefront stays as usual.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Please retry",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock control</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <AdminLoadingState message="Loading stock settings..." />
        ) : null}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, enabled: event.target.checked }))
            }
          />
          Enable stock behavior on storefront
        </label>

        <div className="grid gap-2 max-w-[220px]">
          <Label htmlFor="low-stock-threshold">Low stock threshold</Label>
          <Input
            id="low-stock-threshold"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={thresholdDraft}
            onChange={(event) =>
              setThresholdDraft(event.target.value.replace(/\D/g, ""))
            }
            onBlur={() => {
              const lowStockThreshold = clampLowStockThreshold(
                thresholdDraft,
                form.lowStockThreshold,
              );
              setForm((prev) => ({ ...prev, lowStockThreshold }));
              setThresholdDraft(String(lowStockThreshold));
            }}
          />
          <p className="text-xs text-muted-foreground">
            Low-stock text is shown only when stock is below this value.
          </p>
        </div>

        <Button onClick={onSave} disabled={saveDisabled}>
          <LoadingButtonLabel
            isLoading={isSaving}
            loadingText="Saving..."
            idleText="Save stock setting"
          />
        </Button>
      </CardContent>
    </Card>
  );
}

export default StockControlForm;
