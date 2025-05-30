import { LatestAppointmentsItem } from "./latest-appointments-item";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function LatestAppointmentsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <LatestAppointmentsItem />
        </div>
      </CardContent>
    </Card>
  );
}
