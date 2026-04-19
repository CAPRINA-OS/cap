import { useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Search, Filter, Plus, Package, CalendarDays, X, RotateCcw, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { returnReasonLabel } from "@/lib/order-constants";
import { type WhatsAppOrderData } from "@/lib/whatsapp";
import { WhatsAppDialog } from "@/components/whatsapp-dialog";
import { useToast } from "@/hooks/use-toast";

const statusLabels: Record<string, string> = {
  pending: "قيد الانتظار",
  in_shipping: "قيد الشحن",
  received: "استلم",
  delayed: "مؤجل",
  returned: "مرتجع",
  partial_received: "استلم جزئي",
};

const statusClasses: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-300",
  in_shipping: "bg-sky-50 text-sky-700 border-sky-300",
  received: "bg-emerald-50 text-emerald-700 border-emerald-300",
  delayed: "bg-blue-50 text-blue-700 border-blue-300",
  returned: "bg-red-50 text-red-700 border-red-300",
  partial_received: "bg-purple-50 text-purple-700 border-purple-300",
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(amount);

export default function Orders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { toast } = useToast();
  const [waOrder, setWaOrder] = useState<WhatsAppOrderData | null>(null);

  // 🔥 بدل API القديم (مؤقتًا بيانات فاضية)
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => [],
  });

  const handleWhatsApp = (e: React.MouseEvent, order: any) => {
    e.stopPropagation();
    setWaOrder(order);
  };

  const filtered = orders.filter((o: any) => {
    if (!dateFrom) return true;
    return new Date(o.createdAt) >= new Date(dateFrom);
  });

  const hasActiveFilter = search || status !== "all" || dateFrom;

  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setDateFrom("");
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">الطلبات</h1>
        <Link href="/orders/new">
          <Button>طلب جديد</Button>
        </Link>
      </div>

      <Card className="p-4">
        {isLoading ? (
          <p>جاري التحميل...</p>
        ) : filtered.length > 0 ? (
          <p>تم تحميل الطلبات ✔</p>
        ) : (
          <p>لا توجد طلبات</p>
        )}
      </Card>

      <WhatsAppDialog
        open={!!waOrder}
        onOpenChange={(open) => { if (!open) setWaOrder(null); }}
        order={waOrder}
        onSent={() => toast({ title: "تم" })}
      />
    </div>
  );
}
