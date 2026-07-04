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
  bulkOrderGuard: ApiSettingRecord;
};

type FormState = {
  enabled: boolean;
  threshold: number;
};

const DEFAULT_FORM: FormState = {
  enabled: true,
  threshold: 9,
};

const MIN_THRESHOLD = 2;
const MAX_THRESHOLD = 99;

function clampBulkThreshold(raw: string, fallback: number) {
  const parsed = Number(raw.trim());
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(MAX_THRESHOLD, Math.max(MIN_THRESHOLD, Math.round(parsed)));
}

export function BulkOrderGuardForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [thresholdDraft, setThresholdDraft] = useState(
    String(DEFAULT_FORM.threshold),
  );

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetchWithTimeout("/api/admin/integrations", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Could not load bulk order setting");
        const payload = (await res.json()) as IntegrationsPayload;
        if (cancelled) return;

        const storedThreshold = Number(
          payload.bulkOrderGuard?.value?.threshold ?? DEFAULT_FORM.threshold,
        );
        const threshold = Number.isFinite(storedThreshold)
          ? Math.min(MAX_THRESHOLD, Math.max(MIN_THRESHOLD, Math.round(storedThreshold)))
          : DEFAULT_FORM.threshold;

        setForm({
          enabled: payload.bulkOrderGuard?.isEnabled ?? true,
          threshold,
        });
        setThresholdDraft(String(threshold));
      } catch (error) {
        toast({
          title: "Could not load setting",
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
    const threshold = clampBulkThreshold(thresholdDraft, form.threshold);
    setForm((prev) => ({ ...prev, threshold }));
    setThresholdDraft(String(threshold));

    setIsSaving(true);
    try {
      const res = await fetchWithTimeout("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "bulk_order_guard",
          isEnabled: form.enabled,
          value: { threshold },
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "Save failed");
        throw new Error(text || "Save failed");
      }

      toast({
        title: "Bulk order setting saved",
        description: `Guard is ${form.enabled ? "enabled" : "disabled"} at ${threshold}+ per product line.`,
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
        <CardTitle>Bulk order guard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <AdminLoadingState message="Loading bulk order settings..." />
        ) : null}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.enabled}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, enabled: e.target.checked }))
            }
          />
          Enable bulk-order confirmation popup
        </label>

        <div className="grid gap-2 max-w-[220px]">
          <Label htmlFor="bulk-threshold">Threshold quantity</Label>
          <Input
            id="bulk-threshold"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={thresholdDraft}
            onChange={(e) =>
              setThresholdDraft(e.target.value.replace(/\D/g, ""))
            }
            onBlur={() => {
              const threshold = clampBulkThreshold(
                thresholdDraft,
                form.threshold,
              );
              setForm((prev) => ({ ...prev, threshold }));
              setThresholdDraft(String(threshold));
            }}
          />
          <p className="text-xs text-muted-foreground">
            Popup triggers when a single product line reaches this quantity.
          </p>
        </div>

        <Button onClick={onSave} disabled={saveDisabled}>
          <LoadingButtonLabel
            isLoading={isSaving}
            loadingText="Saving..."
            idleText="Save bulk order setting"
          />
        </Button>
      </CardContent>
    </Card>
  );
}

export default BulkOrderGuardForm;
