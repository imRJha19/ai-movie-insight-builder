import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table";

export function MovieDetailsTable({
  year,
  rating,
  cast,
}: {
  year: string;
  rating: string;
  cast?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <Table>
        <TableHead>
          <tr>
            <TableHeaderCell>Attribute</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </tr>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Release Year</TableCell>
            <TableCell>{year || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>IMDb Rating</TableCell>
            <TableCell>{rating || "N/A"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Lead Cast</TableCell>
            <TableCell>{cast || "N/A"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
